from pydantic import BaseModel

class LectureResponse(BaseModel):
    transcript: str
    notes: str
    quiz: str
    flashcards: str
