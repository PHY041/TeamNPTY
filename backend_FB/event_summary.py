from openai import OpenAI
import re
import ast
import os 
import json
api_key=os.getenv('OPENAI_API_KEY')
client = OpenAI()

prompt_content =(
    "base on the event list,return only generate the hours in the format of 'Monday: 10 hours, Tuesday: 8 hours, Wednesday: 9 hours, Thursday: 7 hours, Friday: 6 hours, Saturday: 5 hours, Sunday: 4 hours'only"
    "Base on the rest detail of the events, generate a summary analysis for the whole week that starts with e.g. : You have utiiized a total of 49 hours this week, with the most events on Monday and the least on Sunday. good job!"
    "Include one sentense of inspirational quote at the end of the summary."
    "store the result into two different object format similar to : {'Monday': 10, 'Tuesday': 8, 'Wednesday': 9, 'Thursday': 7, 'Friday': 6, 'Saturday': 5, 'Sunday': 4}" 
    "another object follow: {Summary': 'You have utiiized a total of 49 hours this week, with the most events on Monday and the least on Sunday. good job!'}"
    "only need to output thees two objects, nothing else"
    #"change line for each event for better presnetation"
)

cuurent_events = [{"title": "Event 1", "location": "Singapore Indoor Stadium", "startofevent": "2024-04-15T19:00:00Z", "endofevent": "2024-04-15T21:00:00Z", "online": "FALSE"},{"title": "Event 2", "location": "Marina Bay Sands", "startofevent": "2024-04-16T10:00:00Z", "endofevent": "2024-04-16T12:00:00Z", "online": "TRUE"},{"title": "Event 3", "location": "Suntec City", "startofevent": "2024-04-17T14:00:00Z", "endofevent": "2024-04-17T16:00:00Z", "online": "FALSE"}]


def get_current_event_hours_and_summary(cuurent_events):
    serialzed_events = json.dumps(cuurent_events)
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt_content},
                    {
                        "type": "text",
                        "text": serialzed_events
                    }
                ]
            }
        ],
        max_tokens=300,
        temperature=1
    )
    #return {keys[i]: event_list[i] if i < len(event_list) else 'N/A' for i in range(len(keys))}
    response_content = response.choices[0].message.content

    return response_content
    
   
print(get_current_event_hours_and_summary(cuurent_events))
