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
from app import app
import json

prompt_content =(
    "the user can imput any form of image, be it a poster, screenshot or any other form of image that contains events."
    "You need to use your OCR to identify what is the events in the image and their corresponding description."
    "Descriibe all the event in the format of subject, location, starting-time and end-time (include the year,date and time if have). isOnline or not."
    "is there is any missing info, please fill it with 'N/A'."
    "for example Event 1, S24K Magic World Tour 2018, Singapore Indoor Stadium, 6 May 2018 7PM, 6 May 2018 9pm, FALSE"
    "There may be multiple evetns in the image, so you need to extract all the events."
    "generate each of the event as a python list format, and return all the events as a list of python list."
    "just need to output list, nothing else"
    #"change line for each event for better presnetation"
)

image_url = r"C:\Users\Benny Pang\Desktop\NTU study\SC2006\Team project\TeamNPTY\backend_FB\photo_2024-04-15_11-43-39.jpg"

with app.test_client() as client:
    response = client.post('/extract',  json={"prompt_content": prompt_content, "image_url": image_url})

    print(response.get_json())

