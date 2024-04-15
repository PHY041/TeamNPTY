from openai import OpenAI
import re
import ast
import os 
import json
api_key=os.getenv('OPENAI_API_KEY')
client = OpenAI()

prompt_content =(
    "Base on the events in the week, generate a summary analysis for the whole week that starts with e.g. : You have utiiized a total of [the total event duration for this week] hours this week, [one analysis about the events we did, like the most time we spent on a specific day], good job!"
    "Include one sentense of inspirational quote at the end of the summary analysis."
    "Output the summary analysis as a string, nothing else"
    #"change line for each event for better presnetation"
)

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
        max_tokens=2000,
        temperature=0.2
    )
    #return {keys[i]: event_list[i] if i < len(event_list) else 'N/A' for i in range(len(keys))}
    response_content = response.choices[0].message.content

    return response_content
    
   
#print(get_current_event_hours_and_summary(cuurent_events))
