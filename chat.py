#!/usr/bin/env python3

import sys
import os
import json
import openai
from dotenv import load_dotenv

# read api key from .env
load_dotenv()

# openai client
client = openai.OpenAI()

# conversation history file
history_file = 'conversation.json'

# check arg amount
if len(sys.argv) < 2:
    print("Usage: ./script.py \"Your message here\" [file1 file2 ...]")
    sys.exit(1)

# load conversation history
if os.path.exists(history_file):
    with open(history_file, 'r') as f:
        conversation = json.load(f)
else:
    conversation = [
        {
            "role": "system",
            "content": (
                "You are a helpful writing editor. You select your words carefully, "
                "and you try to make your point short and concise."
            ),
        }
    ]

# check for files
if len(sys.argv) > 2:
    file_paths = sys.argv[2:]
    for file_path in file_paths:
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r') as file:
                    file_content = file.read()
                message_content = f"Content of file '{file_path}':\n{file_content}"
                conversation.append({"role": "user", "content": message_content})
            except Exception as e:
                print(f"Error reading file '{file_path}': {e}")
                sys.exit(1)
        else:
            print(f"File '{file_path}' does not exist.")
            sys.exit(1)

# get user's message
user_message = sys.argv[1]
conversation.append({"role": "user", "content": user_message})

# get response
try:
    response = client.chat.completions.create(
        model="chatgpt-4o-latest",
        messages=conversation
    )

    # save assistant's response
    assistant_message = response.choices[0].message.content.strip()
    conversation.append({"role": "assistant", "content": assistant_message})

    # save conversation
    with open(history_file, 'w') as f:
        json.dump(conversation, f, indent=4)

    # print assistant's response
    print(assistant_message)

except openai.error.RateLimitError:
    print("Rate limit exceeded. Please try again later.")
except openai.error.OpenAIError as e:
    print(f"An error occurred: {e}")