import os
import ollama

MODEL_NAME = os.getenv("OLLAMA_MODEL", "mistral")
MAX_TRANSCRIPT_CHARS = int(os.getenv("NOTES_MAX_CHARS", "800"))

def generate_notes(transcript, model=None, max_chars=None):

    resolved_model = model or MODEL_NAME
    resolved_max_chars = max_chars or MAX_TRANSCRIPT_CHARS
    clipped = transcript[:resolved_max_chars]

    prompt = f"""You are a study notes expert. Create well-structured study notes from this lecture transcript.

Format your response with:
1. **Main Title** (based on lecture topic)
2. **Key Concepts** - bullet points of main ideas
3. **Important Terms** - definitions of key terms
4. **Summary** - brief overview

Be clear, concise, and use markdown formatting.

Transcript:
{clipped}

Now create the study notes:"""

    try:
        response = ollama.chat(
            model=resolved_model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response["message"]["content"]
    except Exception as e:
        return f"Error generating notes: {str(e)}"
