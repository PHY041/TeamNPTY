from openai import OpenAI
import base64
import requests
import os


# OpenAI API Key
api_key = os.getenv('OPENAI_API_KEY')


# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

#screenshot where to store
# Path to your image
image_path = "C:/Users/Benny Pang/Desktop/2024 S2.png"

# Getting the base64 string
base64_image = encode_image(image_path)

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

payload = {
  "model": "gpt-4-vision-preview",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What’s in this image? Descriibe all the event in the format of Title, starting-time and end-time and location if available. If there is no location, just put the starting-time and end-time"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}"
          }
        }
      ]
    }
  ],
  "max_tokens": 300
}

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

print(response.json())



#def extract_events_from_calendar(image_path):
  # Send the image to OpenAI API for processing
  # client = OpenAI()
  # completion = client.chat.completions.create(
  #   model="gpt-4-vision-preview",
  #   messages=[
  #     {"role": "user", "content": f"Extract events from the calendar image at {image_path}."}
  #   ]
  # )
  
  # Extract the events from the API response
"""  events = completion.choices[0].message
  print(events)
  
  # Process the events and store them in a dictionary
  event_dict = {}
  for event in events:
    title = event.get("title", "")
    description = event.get("description", "")
    start_date_time = event.get("start_date_time", None)
    end_date_time = event.get("end_date_time", "")
    is_online = event.get("is_online", False)
    venue = event.get("venue", None)
    
    event_dict[start_date_time] = {
      "title": title,
      "description": description,
      "end_date_time": end_date_time,
      "is_online": is_online,
      "venue": venue
    }
  
  # Print all the events with their corresponding variables
  for start_time, event_data in event_dict.items():
    print(f"Start Time: {start_time}")
    print(f"Title: {event_data['title']}")
    print(f"Description: {event_data['description']}")
    print(f"End Date Time: {event_data['end_date_time']}")
    print(f"Is Online: {event_data['is_online']}")
    print(f"Venue: {event_data['venue']}")
    print()
  
  return event_dict """



 
