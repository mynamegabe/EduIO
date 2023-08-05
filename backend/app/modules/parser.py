

def parseQuiz(content):
    content = content.split("\n")
    questions = []
    answers = []
    compiled = []
    for line in content:
        if line.startswith("Question"):
            questions.append(line.split(":")[1].strip())
        elif line.startswith("Answer"):
            answers.append(line.split(":")[1].strip())
    # compiled = list(zip(questions, answers))
    compiled = [{"question": x, "answer": y} for x, y in zip(questions, answers)]
    return compiled

def parseSummary(content):
    summary = content[content.find("Summary:")+len("Summary:"):].strip()
    return summary
    
def parseMCQ(content):
    content = content.split("\n")
    questions = []
    options = []
    answers = []
    compiled = []
    for line in content:
        if line.startswith("Question"):
            questions.append(line.split(":")[1].strip())
        elif line.startswith("Options"):
            index = content.index(line)
            this_options = []
            for i in range(1,5):
                this_options.append(content[index+i][3:].strip())
            options.append(this_options)
        elif line.startswith("Answer"):
            answers.append(line.split(":")[1].strip())
    compiled = [{"question": x, "options": y, "answer": z} for x, y, z in zip(questions, options, answers)]
    return compiled