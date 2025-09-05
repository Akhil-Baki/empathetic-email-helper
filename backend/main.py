# backend/main.py

import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

# -------------------------------------------------------------------
# Load environment variables from .env file
# -------------------------------------------------------------------
load_dotenv()

# Get the API key from .env
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = OpenAI(api_key=openai_api_key)

# -------------------------------------------------------------------
# Initialize FastAPI app
# -------------------------------------------------------------------
app = FastAPI()

# Enable CORS so frontend (React/Vite/Next.js) can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # In production, replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------------
# Root endpoint - just to test backend is running
# -------------------------------------------------------------------
@app.get("/")
def root():
    return {"message": "Backend is running successfully!"}

# -------------------------------------------------------------------
# Reply endpoint - generates empathetic reply using OpenAI API
# -------------------------------------------------------------------
@app.post("/reply")
async def generate_reply(request: Request):
    """
    This endpoint accepts an email body (JSON) and returns an
    empathetic AI-generated reply using OpenAI GPT model.
    """

    # Parse request body
    data = await request.json()
    email_body = data.get("body")

    # Check if body exists
    if not email_body:
        return {"detail": "Email body is required"}

    # ----------------------------------------------------------------
    # Call OpenAI API to generate the reply
    # ----------------------------------------------------------------
    response = client.chat.completions.create(
        model="gpt-4o-mini",   # Fast + cost-efficient model
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
                "content": email_body
            }
        ]
    )

    # Extract reply text from OpenAI response
    reply_text = response.choices[0].message.content

    # ----------------------------------------------------------------
    # Return the reply in JSON
    # ----------------------------------------------------------------
    return {"reply": reply_text}
