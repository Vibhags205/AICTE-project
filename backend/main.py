from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from datetime import datetime

from speech_to_text import transcribe_audio
from summarizer import generate_notes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HISTORY = []
SETTINGS = {
    "model": os.getenv("OLLAMA_MODEL", "mistral"),
    "max_chars": int(os.getenv("NOTES_MAX_CHARS", "800"))
}

@app.get("/health")
async def health_check():
    return {"status": "Backend is running!"}

@app.post("/upload")
async def upload_audio(
    file: UploadFile = File(...),
    model: str = Form(None),
    max_chars: int = Form(None)
):

    file_path = f"temp_{file.filename}"
    
    print(f"[API] Uploading file: {file.filename}")

    try:
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        print("[API] File saved successfully")
        print("[API] Transcribing audio...")
        transcript = transcribe_audio(file_path)
        print(f"[API] Transcript length: {len(transcript)}")

        print("[API] Generating notes...")
        resolved_model = model or SETTINGS["model"]
        resolved_max_chars = max_chars or SETTINGS["max_chars"]
        notes = generate_notes(transcript, model=resolved_model, max_chars=resolved_max_chars)
        print("[API] Notes generated")
        
        # Skip quiz generation to reduce processing time.
        quiz = ""
        
        print("[API] Processing complete!")
        
        # Clean up temp file
        if os.path.exists(file_path):
            os.remove(file_path)

        HISTORY.insert(0, {
            "id": len(HISTORY) + 1,
            "filename": file.filename,
            "created_at": datetime.utcnow().isoformat() + "Z",
            "notes": notes,
            "transcript": transcript
        })

        return {
            "transcript": transcript,
            "notes": notes,
            "quiz": quiz
        }
    
    except Exception as e:
        print(f"[API ERROR] {str(e)}")
        import traceback
        traceback.print_exc()
        if os.path.exists(file_path):
            os.remove(file_path)
        return {
            "error": str(e),
            "transcript": "",
            "notes": f"Error: {str(e)}",
            "quiz": f"Error: {str(e)}"
        }

@app.get("/history")
async def get_history():
    return HISTORY

@app.get("/settings")
async def get_settings():
    return SETTINGS

@app.post("/settings")
async def update_settings(payload: dict):
    model = payload.get("model", SETTINGS["model"])
    max_chars = payload.get("max_chars", SETTINGS["max_chars"])

    SETTINGS["model"] = model or SETTINGS["model"]
    SETTINGS["max_chars"] = int(max_chars or SETTINGS["max_chars"])
    return SETTINGS
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)