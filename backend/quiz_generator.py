import os
import ollama

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
client = ollama.Client(host=OLLAMA_HOST)

def generate_quiz(transcript):

    prompt = f"""Create 3 multiple choice quiz questions from this lecture. Make questions clear and test understanding.

For each question, use this exact format:

Question 1: [clear question about the lecture content]
A) [plausible wrong answer]
B) [plausible wrong answer]
C) [plausible wrong answer]
D) [correct answer]
Answer: D

Question 2: [next question]
A) [option]
B) [option]
C) [correct answer]
D) [option]
Answer: C

Question 3: [another question]
A) [option]
B) [correct answer]
C) [option]
D) [option]
Answer: B

Transcript:
{transcript[:2000]}

Now create the quiz:"""

    try:
        response = client.chat(
            model="mistral",
            messages=[{"role": "user", "content": prompt}]
        )
        return response["message"]["content"]
    except Exception as e:
        return f"Error generating quiz: {str(e)}"
