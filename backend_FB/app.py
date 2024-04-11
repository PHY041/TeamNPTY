from flask import Flask, jsonify, request # Corrected import statement
import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin import db
from readcalonline import get_event_details_from_image
from flask_cors import CORS
import requests

# Initialize the Firebase app with Realtime Database URL
cred = credentials.Certificate(r'compassproject-dbf1c-firebase-adminsdk-vskzq-c9d334f0eb.json')
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://compassproject-dbf1c-default-rtdb.asia-southeast1.firebasedatabase.app/'
})



# Function to save data to the Realtime Database
def save_data_to_realtime_database(data):
    ref = db.reference('/events')
    new_ref = ref.push()
    new_ref.set(data)
    return {"result": "Data saved to Realtime Database", "data": data}  # return a serializable object

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

'''
#works for realtime data base, need to change to user authentication 
@app.route('/signup', methods=['POST'])
def create_user():
    """Create a new user."""
    user_data = request.json
    ref = get_collection_ref('users')
    new_ref = ref.push()
    new_ref.set(user_data)
    return jsonify({"message": "User created", "id": new_ref.key}), 201
'''

#just need to call https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaL71ivLkD1ET0_3prFEXdR01T832Ek5E

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
            id_token = r.json().get('idToken')
            refresh_token = r.json().get('refreshToken')
            # Return success response
            return jsonify({'success': True, 'id_token': id_token, 'refresh-token': refresh_token}), 200
        else:
            # Handle request failure
            return jsonify({'success': False, 'error': r.json()}), r.status_code

    except Exception as e:
        # Handle other exceptions
        return jsonify({'success': False, 'error': str(e)}), 500


#will not work 
# @app.route('/login', methods=['POST'])
# def login():
#     # Get the ID token sent by the client
#     email = request.json.get('email')
#     password = request.json.get('password')
#     id_token = request.json.get('idToken')
#     if (email):
#         try:
#             # Check the token against the Firebase Auth API
#             user = auth.get_user_by_email(email)
            
#             decoded_token = auth.verify_id_token(id_token)
#             #uid = decoded_token['uid']
#             uid = '9d6dN3QAF1cEAEN0GlGbJ8TJa9J3'
#             return jsonify({"message": "User authenticated", "uid": uid}), 200
#         except auth.AuthError as e:
#             # Token is invalid
#             return jsonify({"error": "Invalid credentials", "details": str(e)}), 401
#     else:
#         return jsonify({"error": "Missing ID token"}), 400

#ticked
@app.route('/events', methods=['POST'])
def create_event():
    # Extract the ID token from the Authorization header
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({"error": "Authorization token is required"}), 401

    try:
        # Verify the ID token and get the user's UID
        decoded_token = auth.verify_id_token(id_token)
        #uid = decoded_token['uid']
        uid = '9d6dN3QAF1cEAEN0GlGbJ8TJa9J3'
    except auth.AuthError:
        return jsonify({"error": "Invalid or expired token"}), 401

    # Assuming event_data is structured correctly and sanitized
    event_data = request.json
    event_data['user_id'] = uid  # Set the UID in the event data

    ref = get_collection_ref('events')
    new_ref = ref.push()
    new_ref.set(event_data)
    return jsonify({"message": "Event created", "id": new_ref.key}), 201

#ticked
@app.route('/my-events', methods=['GET'])
def get_user_events():
    # Extract the ID token from the Authorization header
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({"error": "Authorization token is required"}), 401

    try:
        # Verify the ID token and get the user's UID
        decoded_token = auth.verify_id_token(id_token)
        #uid = decoded_token['uid']
        uid = '9d6dN3QAF1cEAEN0GlGbJ8TJa9J3'
    except auth.AuthError:
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

    try:
        # Verify the ID token and get the user's UID
        decoded_token = auth.verify_id_token(id_token)
        #uid = decoded_token['uid']
        uid = '9d6dN3QAF1cEAEN0GlGbJ8TJa9J3'
    except auth.AuthError:
        return jsonify({"error": "Invalid or expired token"}), 401

    data = request.get_json()
    prompt_content = data.get('prompt_content')
    image_url = data.get('image_url')

    if not prompt_content or not image_url:
        return jsonify({"error": "Missing prompt_content or image_url"}), 400

    # Extract event details from the image
    event_details = get_event_details_from_image(prompt_content, image_url)
    
    # Add the user's UID to the event details
    event_details['user_id'] = uid

    ref = get_collection_ref('events')
    new_ref = ref.push()
    
    new_ref.set(event_details)
    return jsonify({"message": "Event created", "id": new_ref.key}), 201





if __name__ == '__main__':
    app.run(debug=True)
