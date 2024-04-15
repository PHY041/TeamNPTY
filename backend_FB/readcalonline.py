from openai import OpenAI
import re
import ast
import os 
api_key=os.getenv('OPENAI_API_KEY')
client = OpenAI()

prompt_content =(
    "the user can imput any form of image, be it a poster, screenshot or any other form of image that contains events."
    "You need to use your OCR to identify what is the events in the image and their corresponding description."
    "Descriibe all the event in the format of subject, location, starting-time and end-time (include the year,date and time if have). isOnline or not."
    "start-time and end-time in the image is in GMT+8 timezone, generate it as UTC in yyyy-mm-ddT00:00:00Z"
    "if exact year/date/day is not given, have it in the this year(2024) and week"
    "if no duration is given, end-time is 30 minutes after start-time"
    "is there is any missing info, please fill it with 'N/A'."
    "There may be multiple evetns in the image, so you need to extract all the events."
    "generate each of the event as a python list format, and return all the events as a list of python list."
    "just need to output list, nothing else"
    #"change line for each event for better presnetation"
)

image_url = "https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/12/2023/06/24_taylorswift_b0d99c0ecefc712be1fafa281760c507.jpeg"

def extract_event_details(event_string):
    # Define the keys for the dictionary
    keys = ["title", "location", "startofevent", "endofevent", "online", "user_id", "description"]
    
    # Use regex to find the content within the outer brackets
    matches = re.findall(r'\[.*?\]', event_string)
    
    # Initialize the all_events list
    all_events = []
    
    # Iterate over the matches, ignoring the first one as it is the outermost list
    for match in matches[0:]:  # Start from 1 to skip the entire list match
        # Evaluate the string to a list
        event_details = ast.literal_eval(match)
        # Pad the event_details list with 'N/A' if it has fewer items than the keys list
        while len(event_details) < len(keys):
            event_details.append('N/A')
        # Create a dictionary from the keys and event details
        event_dict = dict(zip(keys, event_details))
        # Append the dictionary to the all_events list
        all_events.append(event_dict)
        
    return all_events


def get_event_details_from_image(image_url):
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt_content},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_url,
                        },
                    },
                ],
            }
        ],
        max_tokens=300,
        temperature=0.2
    )
    '''''
    content_string = response.choices[0].message.content
    #wwhat print(response.choices[0].message.content)
    # Use regular expressions to find the list part of the string
    match = re.search(r"\[.*?\]", content_string)

    if match:
        # If a match is found, evaluate the string to get the actual list
        event_list = ast.literal_eval(match.group())
        event_list.append("N/A")


    else:
        print("No list found in the string")
    keys = ["title", "location", "startofevent", "endofevent", "online","user_id","description"]
    '''
    #return {keys[i]: event_list[i] if i < len(event_list) else 'N/A' for i in range(len(keys))}
    response_content = response.choices[0].message.content
    print(response_content)
    #keys = ["title", "location", "startofevent", "endofevent", "online", "user_id", "description"]
    return(extract_event_details(response_content))
    
   
print(get_event_details_from_image(image_url))   




# Assuming 'response.choices[0].message.content' contains the string from the second picture
#response_content = response.choices[0].message.content
#keys = ["title", "location", "startofevent", "endofevent", "online", "user_id", "description"]

# Call the function with the response content and keys
#all_events = extract_events(response_content, keys)

# Print the result
#print(all_events)

