import requests

from config import GPT_API_URL

MAX_CHARS = 16000
QUIZ_PROMPT = '''The following content between <> and </> is content from an article. Generate %s questions for students based on the content. Follow this format STRICTLY. 
Question x: <question>
Answer x: <answer>.
The content:
<>
%s
</>
'''

SUMMARY_PROMPT = '''The following content between <> and </> is content from an article. Generate a summary for students based on the content. Follow this format STRICTLY.
Summary: <summary>
The content:
<>
%s
</>
'''

MCQ_PROMPT = '''The following content between <> and </> is content from an article. Generate %s MCQs for students based on the content. Follow this format STRICTLY.
Question x: <question>
Options for Question x: 
1. <option 1>
2. <option 2>
3. <option 3>
4. <option 4>
Answer: <1,2,3,4>
The content:
<>
%s
</>
'''

FILL_THE_BLANK_PROMPT = '''The following content between <> and </> is content from an article. Generate %s 1 word fill-in-the-blank questions for students based on the content. Blanks must be in the format "_____". Follow this format STRICTLY.
Question x: <question>
Answer x: <answer>
The content:
<>
%s
</>
'''

def get_gpt_response(prompt):
    if len(prompt) + len(QUIZ_PROMPT) > MAX_CHARS:
        prompt = prompt[:MAX_CHARS - len(QUIZ_PROMPT)]
    data = {
        "messages": [{
            "role": "user",
            "content": prompt
        }]
    }
    response = requests.post(GPT_API_URL, json=data)
    if response.status_code != 200:
        return response.text
    return response.json()["choices"][0]["message"]["content"]


def generateQuiz(prompt, num_questions=10):
    full_prompt = QUIZ_PROMPT % (num_questions, prompt)
    return get_gpt_response(full_prompt)

def generateSummary(prompt):
    full_prompt = SUMMARY_PROMPT % prompt
    return get_gpt_response(full_prompt)

def generateMCQ(prompt, num_questions=10):
    full_prompt = MCQ_PROMPT % (num_questions, prompt)
    return get_gpt_response(full_prompt)

def generateFillTheBlank(prompt, num_questions=10):
    full_prompt = FILL_THE_BLANK_PROMPT % (num_questions, prompt)
    return get_gpt_response(full_prompt)
