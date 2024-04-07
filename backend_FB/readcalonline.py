from openai import OpenAI
import re
import ast

client = OpenAI()

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


def get_event_details_from_image(prompt_content, image_url):
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
    keys = ["title", "location", "start_time", "end_time", "online","user_id"]
    return {keys[i]: event_list[i] if i < len(event_list) else 'N/A' for i in range(len(keys))}
    




get_event_details_from_image(prompt_content, image_url)