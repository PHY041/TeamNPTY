'''import requests

def get_events():
    response = requests.post('http://127.0.0.1:5000/extract')
    
    if response.status_code == 200:
        return response.json()
    else:
        return None


events = get_events()
print(events)
'''

# app1.py
from app1 import app
import json

prompt_content =(
    "the user can imput any form of image, be it a poster, screenshot or any other form of image that contains events."
    "You need to use your OCR to identify what is the events in the image and their corresponding description."
    "Descriibe all the event in the format of subject, location, starting-time and end-time (include the year,date and time if have). isOnline or not."
    "is there is any missing info, please fill it with 'N/A'."
    "for example Event 1, S24K Magic World Tour 2018, Singapore Indoor Stadium, 6 May 2018 7PM, 6 May 2018 9pm, FALSE"
    "generate each of the event as a python list format, and return all the events as a list of python list."
    "just need to output list, nothing else"
    #"change line for each event for better presnetation"
)

image_url = "https://bandwagon-gig-finder.s3.amazonaws.com/editorials/uploads/pictures/10162/content_22366746_2153790044634663_7577485354131293614_n.jpg"

with app.test_client() as client:
    response = client.post('/extract',  json={"prompt_content": prompt_content, "image_url": image_url})

    print(response.get_json())

