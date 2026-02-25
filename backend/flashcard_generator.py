import os
import ollama

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
client = ollama.Client(host=OLLAMA_HOST)

def generate_flashcards(transcript):

    prompt = f"""Create 3 flashcards:

Q: [question]
A: [answer]

Transcript:
{transcript[:1500]}"""

    try:
        response = client.chat(
            model="mistral",
            messages=[{"role": "user", "content": prompt}],
            timeout=120
        )
        return response["message"]["content"]
    except Exception as e:
        return f"Error generating flashcards: {str(e)}"
