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
    "generate each of the event as a python list format, and return all the events as a list of python list."
    "just need to output list, nothing else"
    #"change line for each event for better presnetation"
)

image_url = "https://bandwagon-gig-finder.s3.amazonaws.com/editorials/uploads/pictures/10162/content_22366746_2153790044634663_7577485354131293614_n.jpg"


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

    content_string = response.choices[0].message.content
    # Use regular expressions to find the list part of the string
    match = re.search(r"\[.*?\]", content_string)

    if match:
        # If a match is found, evaluate the string to get the actual list
        event_list = ast.literal_eval(match.group())
        event_list.append("N/A")

    else:
        print("No list found in the string")
    keys = ["title", "location", "startofevent", "endofevent", "online","user_id","description"]
    return {keys[i]: event_list[i] if i < len(event_list) else 'N/A' for i in range(len(keys))}
    




get_event_details_from_image(image_url)