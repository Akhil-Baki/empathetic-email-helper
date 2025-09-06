# backend/main.py

import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

# -------------------------------------------------------------------
# Load environment variables
# -------------------------------------------------------------------
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

if not openai_api_key:
    raise RuntimeError("OPENAI_API_KEY is missing. Set it in your environment.")

# Initialize OpenAI client
client = OpenAI(api_key=openai_api_key)

# -------------------------------------------------------------------
# FastAPI app setup
# -------------------------------------------------------------------
app = FastAPI(title="Empathetic Email Helper API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------------
# Pydantic models
# -------------------------------------------------------------------
class ReplyRequest(BaseModel):
    body: str

class ReplyResponse(BaseModel):
    reply: str

# -------------------------------------------------------------------
# Root endpoint (health check)
# -------------------------------------------------------------------
@app.get("/")
async def root():
    return {"message": "Backend is running successfully 🚀"}

# -------------------------------------------------------------------
# Reply endpoint (AI-generated empathetic reply)
# -------------------------------------------------------------------
@app.post("/reply", response_model=ReplyResponse)
async def generate_reply(request: ReplyRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",   # fast + efficient model
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful and empathetic customer support assistant. "
                        "Always respond in a friendly, professional, and understanding tone. "
                        "If the customer is upset, show empathy and reassure them."
                    )
                },
                {
                    "role": "user",
                    "content": request.body
                }
            ]
        )

        reply_text = response.choices[0].message.content
        return ReplyResponse(reply=reply_text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------------------------------------------------------------------
# Mock emails (demo only)
# -------------------------------------------------------------------
MOCK_EMAILS = [
    {
        "id": "1",
        "subject": "URGENT: Website completely down, losing customers!",
        "sender_name": "Sarah Johnson",
        "sender_email": "sarah.j@techcorp.com",
        "content": "Hi there, our entire website has been down for over 2 hours now...",
        "received_at": "2024-01-15T14:30:00Z",
        "sentiment": "negative",
        "urgency": "urgent",
        "category": "technical",
        "status": "unread",
        "contacts": ["Sarah Johnson", "Tech Corp"],
        "requests": ["Website restoration", "Technical support"],
        "ai_draft": "Dear Sarah, ..."
    }
]

@app.get("/emails/{email_id}")
async def get_email_details(email_id: str):
    for email in MOCK_EMAILS:
        if email["id"] == email_id:
            return email
    raise HTTPException(status_code=404, detail="Email not found")
