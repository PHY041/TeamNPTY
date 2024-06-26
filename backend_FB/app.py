from flask import Flask, jsonify, request # Corrected import statement
import firebase_admin
from firebase_admin import credentials, auth, storage
from firebase_admin import db
from readcalonline import get_event_details_from_image
from event_summary import get_current_event_hours_and_summary
from flask_cors import CORS
import requests
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
import pytz
import random
import string


# Initialize the Firebase app with Realtime Database URL
cred = credentials.Certificate(r'compassproject-dbf1c-firebase-adminsdk-vskzq-c9d334f0eb.json')
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://compassproject-dbf1c-default-rtdb.asia-southeast1.firebasedatabase.app/',
    'storageBucket': 'compassproject-dbf1c.appspot.com'
})



# Function to save data to the Realtime Database
def save_data_to_realtime_database(data):
    ref = db.reference('/events')
    new_ref = ref.push()
    new_ref.set(data)
    return {"result": "Data saved to Realtime Database", "data": data}  # return a serializable object

def get_current_week_events(user_events):
    """
    Filter events based on the current week.

    Args:
    - all_events (list of dicts): A list of event dictionaries, each having at least a 'date' key.

    Returns:
    - list of dicts: A list of events that are within the current week.
    """
    # Find the current date
    now = datetime.now()
    
    # Calculate the start and end of the week
    start_of_week = now - timedelta(days=now.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    # Convert start and end to dates for comparison (ignore time)
    start_of_week_date = start_of_week.date()
    end_of_week_date = end_of_week.date()

    # Filter events that are within the current week
    current_week_events = [
        event for event in user_events.values()
        if start_of_week_date <= datetime.strptime(event['startofevent'], '%Y-%m-%dT%H:%M:%SZ').date() <= end_of_week_date
    ]

    hours_per_day = {
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
        'Sunday': 0
    }

    # Iterate over the events
    for event in current_week_events:
        # Parse the start and end times
        start = datetime.strptime(event['startofevent'], '%Y-%m-%dT%H:%M:%SZ')

        end = datetime.strptime(event['endofevent'], '%Y-%m-%dT%H:%M:%SZ')
        
        # Add 8 hours to the datetime
        start_singapore = start + timedelta(hours=8)
        end_singapore = end + timedelta(hours=8)

        # Format the datetime as a string in the desired format
        #start_singapore_str = start_singapore.strftime('%Y-%m-%d %H:%M:%S')
        #end_singapore_str = end_singapore.strftime('%Y-%m-%d %H:%M:%S')
        # Calculate the duration of the event in hours
        duration = round((end_singapore - start_singapore).total_seconds() / 3600,3)

        # Add the duration to the appropriate day of the week
        day_of_week = start_singapore.strftime('%A')
        if day_of_week in hours_per_day:
            hours_per_day[day_of_week] += duration

    return hours_per_day

# Initialize Flask app
app = Flask(__name__)
CORS(app)

#ticked
@app.route('/')
def home():
    return 'Hello, World!'

def get_collection_ref(collection_name):
    """Utility function to get a reference to a specific collection."""
    return db.reference(f'/{collection_name}')

#can just call https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaL71ivLkD1ET0_3prFEXdR01T832Ek5E

@app.route('/signup', methods=['POST'])
def create_user():

    # Firebase Authentication sign-up endpoint with the API key
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaL71ivLkD1ET0_3prFEXdR01T832Ek5E'

    try:
        # Make the POST request to Firebase Authentication API
        r = requests.post(url, json=request.json)

        # If the request is successful
        if r.status_code == 200:
            # Parse the response data
            user_data = r.json()
            # You could perform additional steps here, like creating a user profile in your database

            # Return success response
            return jsonify({'success': True, 'data': user_data}), 200
        else:
            # Handle request failure
            return jsonify({'success': False, 'error': r.json()}), r.status_code

    except Exception as e:
        # Handle other exceptions
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    return_secure_token = True # Set to True to get an ID and refresh token from Firebase

    # Prepare the payload with email and password
    payload = {
        'email': email,
        'password': password,
        'returnSecureToken': return_secure_token
    }

    # Firebase Authentication sign-in endpoint with the API key
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaL71ivLkD1ET0_3prFEXdR01T832Ek5E'

    try:
        # Make the POST request to Firebase Authentication API
        r = requests.post(url, json=payload)

        # If the request is successful
        if r.status_code == 200:
            # Parse the response data
            
            # user_id = r.json().get('localId')
            id_token = r.json().get('idToken')
            # user_data = r.json()
            # Return success response
            return jsonify({'success': True, 'id_token':id_token}), 200
        else:
            # Handle request failure
            return jsonify({'success': False, 'error': r.json()}), r.status_code

    except Exception as e:
        # Handle other exceptions
        return jsonify({'success': False, 'error': str(e)}), 500



#ticked
@app.route('/events', methods=['POST'])
def create_event():
    # Extract the ID token from the Authorization header
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({"error": "Authorization token is required","success":False}), 401
    
    if id_token.startswith('Bearer '):
    # Strip the prefix 'Bearer ' from the token
        id_token = id_token.split('Bearer ')[1]
        
    try:
        # Verify the ID token and get the user's UID
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        # uid = '9d6dN3QAF1cEAEN0GlGbJ8TJa9J3'
    except:
        return jsonify({"error": "Invalid or expired token","success":False, "id_token":id}), 401

    # Assuming event_data is structured correctly and sanitized
    event_data = request.json
    startofevent = event_data['startofevent']
    endofevent = event_data['endofevent']
    if startofevent >= endofevent:
        return jsonify({"error": "Start of event cannot be later than end of event","success":False}), 401
    event_data['user_id'] = uid  # Set the UID in the event data

    ref = get_collection_ref('events')
    new_ref = ref.push()
    new_ref.set(event_data)
    return jsonify({"message": "Event created", "id": new_ref.key, "success":True}), 201

#ticked
@app.route('/my-events', methods=['GET'])
def get_user_events():
    # Extract the ID token from the Authorization header
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({"error": "Authorization token is required"}), 401

    if id_token.startswith('Bearer '):
    # Strip the prefix 'Bearer ' from the token
        id_token = id_token.split('Bearer ')[1]
        
    try:
        # Verify the ID token and get the user's UID
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        # uid = '9d6dN3QAF1cEAEN0GlGbJ8TJa9J3'
    except:
        return jsonify({"error": "Invalid or expired token"}), 401

    try:
        # Retrieve events from the database where the 'user_id' matches the uid
        events_ref = db.reference('events')
        all_events = events_ref.order_by_child('user_id').equal_to(uid).get()

        # Filter out events by user ID if necessary
        user_events = {k: v for k, v in all_events.items() if 'user_id' in v and v['user_id'] == uid}

        return jsonify(user_events), 200
    except Exception as e:
        return jsonify({"error": "Failed to retrieve events", "details": str(e)}), 500
    
@app.route('/my-events-summary', methods=['GET'])
def get_user_events_summary():
    # Extract the ID token from the Authorization header
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({"error": "Authorization token is required"}), 401

    if id_token.startswith('Bearer '):
    # Strip the prefix 'Bearer ' from the token
        id_token = id_token.split('Bearer ')[1]
        
    try:
        # Verify the ID token and get the user's UID
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        # uid = '9d6dN3QAF1cEAEN0GlGbJ8TJa9J3'
    except :
        return jsonify({"error": "Invalid or expired token"}), 401

    try:
        # Retrieve events from the database where the 'user_id' matches the uid
        events_ref = db.reference('events')
        all_events = events_ref.order_by_child('user_id').equal_to(uid).get()

        # Filter out events by user ID if necessary
        user_events = {k: v for k, v in all_events.items() if 'user_id' in v and v['user_id'] == uid}
        cuurent_events = get_current_week_events(user_events)
        print(cuurent_events)
        result = get_current_event_hours_and_summary(cuurent_events)
        print(result)
        final_reuslt = {"events":cuurent_events,"summary":result}

        return jsonify(final_reuslt), 200
    except Exception as e:
        return jsonify({"error": "Failed to retrieve events", "details": str(e)}), 500


#ticked
@app.route('/events/<event_id>', methods=['GET'])
def get_event(event_id):
    """Retrieve an event by ID."""
    ref = get_collection_ref(f'events/{event_id}')
    event = ref.get()
    if event:
        return jsonify(event), 200
    else:
        return jsonify({"error": "Event not found"}), 404
#
@app.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    """Update an event by ID."""
    event_data = request.json
    ref = get_collection_ref(f'events/{event_id}')
    ref.update(event_data)
    return jsonify({"message": "Event updated"}), 200

@app.route('/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    """Delete an event by ID."""
    ref = get_collection_ref(f'events/{event_id}')
    ref.delete()
    return jsonify({"message": "Event deleted"}), 200


#ticked
@app.route('/extract', methods=['POST'])
def extract_events():
    # Extract the ID token from the Authorization header
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({"error": "Authorization token is required"}), 401

    if id_token.startswith('Bearer '):
    # Strip the prefix 'Bearer ' from the token
        id_token = id_token.split('Bearer ')[1]
        
    try:
        # Verify the ID token and get the user's UID
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        # uid = '9d6dN3QAF1cEAEN0GlGbJ8TJa9J3'
    except :
        return jsonify({"error": "Invalid or expired token","success":False}), 401

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Generate a random string of characters
    def generate_random_string(length):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(length))

   # Check if the file name is 'image.png'
    if file.filename == 'image.png':
        # Generate a random file name
        random_name = generate_random_string(10) + '.png'
        file.filename = random_name

 
    filename = secure_filename(file.filename)


    # The file will be uploaded directly to Firebase Storage, so no need to save locally
    # Create a Firebase Storage reference
    bucket = storage.bucket()
    blob = bucket.blob(filename)

    # Upload the file
    blob.upload_from_string(
        file.read(),
        content_type=file.content_type
    )
    
    # Make the blob publicly viewable
    blob.make_public()

    # Generate the URL
    image_url = blob.public_url

    if not image_url:
        return jsonify({"error": "Missing prompt_content or image_url", "success":False}), 400

    # Extract event details from the image
    all_events = get_event_details_from_image(image_url)
    if all_events == []:
        return jsonify({"error": "No events extracted from the image", "success":False}), 400

    for event in all_events:
        event['user_id'] = uid
        event['description'] = request.form.get('description')
    

        ref = get_collection_ref('events')
        new_ref = ref.push()
    
        new_ref.set(event)
    return jsonify({"message": "Event created","success":True}), 201

@app.route('/resetpassword', methods=['POST']) 
def reset_password(): 
    """Send a password reset email to the user.""" 
    email = request.json.get('email') 
    if not email: 
        return jsonify({'success': False, 'error': 'Email address is required'}), 400 
 
    # Firebase Authentication password reset endpoint with the API key 
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAaL71ivLkD1ET0_3prFEXdR01T832Ek5E' 
 
    payload = { 
        'requestType': 'PASSWORD_RESET', 
        'email': email 
    } 
 
    try: 
        response = requests.post(url, json=payload) 
        if response.status_code == 200: 
            return jsonify({'success': True, 'message': 'Password reset email sent successfully'}), 200 
        else: 
            return jsonify({'success': False, 'error': response.json().get('error', {}).get('message', 'Failed to send password reset email')}), response.status_code 
    except requests.RequestException as e: 
        return jsonify({'success': False, 'error': str(e)}), 500 
     
@app.route('/updatepassword', methods=['POST']) 
def update_password(): 
    """Update the user's password.""" 
    id_token = request.headers.get('Authorization') 
    new_password = request.json.get('password') 
 
    if not id_token or not id_token.startswith('Bearer '): 
        return jsonify({'success': False, 'error': 'Authorization token is required'}), 401 
    if not new_password: 
        return jsonify({'success': False, 'error': 'New password is required'}), 400 
 
    id_token = id_token.split('Bearer ')[1]  # Extract the actual token 
 
    # Firebase change password endpoint with the API key 
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAaL71ivLkD1ET0_3prFEXdR01T832Ek5E' 
 
    payload = { 
        'idToken': id_token, 
        'password': new_password, 
        'returnSecureToken': True  # Whether or not to return an ID and refresh token 
    } 
 
    try: 
        response = requests.post(url, json=payload) 
        if response.status_code == 200: 
            return jsonify({'success': True, 'message': 'Password updated successfully'}), 200 
        else: 
            return jsonify({'success': False, 'error': response.json().get('error', {}).get('message', 'Failed to update password')}), response.status_code 
    except requests.RequestException as e: 
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
