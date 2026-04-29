from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deepface import DeepFace
import base64
import cv2
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImagePayload(BaseModel):
    image: str

def decode_base64_image(base64_string: str):
    try:
        if "," in base64_string:
            base64_string = base64_string.split(",")[1]

        image_data = base64.b64decode(base64_string)
        np_arr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        return img
    except Exception:
        return None

def map_emotion(raw_emotion: str):
    emotion_map = {
        "happy": "Happy",
        "sad": "Sad",
        "neutral": "Calm",
        "angry": "Energetic",
        "surprise": "Energetic",
        "fear": "Calm",
        "disgust": "Calm"
    }
    return emotion_map.get(raw_emotion.lower(), "Calm")

@app.get("/")
def root():
    return {"message": "Emotion service is running"}

@app.post("/detect-emotion")
def detect_emotion(payload: ImagePayload):
    try:
        img = decode_base64_image(payload.image)

        if img is None:
            return {
                "success": False,
                "message": "Invalid image data"
            }

        analysis = DeepFace.analyze(
            img_path=img,
            actions=["emotion"],
            enforce_detection=True
        )

        if isinstance(analysis, list):
            analysis = analysis[0]

        raw_emotion = analysis.get("dominant_emotion", "neutral")
        emotions = analysis.get("emotion", {})
        confidence = float(emotions.get(raw_emotion, 0.0))
        mapped_emotion = map_emotion(raw_emotion)

        return {
            "success": True,
            "raw_emotion": raw_emotion,
            "mapped_emotion": mapped_emotion,
            "confidence": round(confidence, 2)
        }

    except Exception as e:
        error_message = str(e).lower()

        if "face could not be detected" in error_message or "face" in error_message:
            return {
                "success": False,
                "message": "No face detected. Please face the camera clearly and try again."
            }

        return {
            "success": False,
            "message": "Emotion detection failed"
        }