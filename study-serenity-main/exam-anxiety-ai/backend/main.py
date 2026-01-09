from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from logic.micro_goals import generate_micro_goals
from logic.confidence_score import calculate_confidence
from logic.encouragement import generate_message
import os

app = FastAPI(root_path=os.environ.get("FASTAPI_ROOT_PATH", ""))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate-goals")
def goals():
    weak_topics = ["Algebra", "Probability", "Trigonometry", "Calculus", "Geometry"]
    return {"goals": generate_micro_goals(weak_topics)}

@app.get("/confidence")
def confidence():
    # Mock dynamic inputs for demo
    score = calculate_confidence(85, 72, 75, 60)
    return {"confidence_score": score}

@app.get("/encouragement")
def encouragement():
    # Returns { "message": "...", "reason": "..." }
    return generate_message(12, 5)

@app.get("/confidence/trend")
def confidence_trend():
    # Mock trend data (replace later with DB)
    return {
        "trend": [
            {"date": "Day 1", "score": 55},
            {"date": "Day 2", "score": 60},
            {"date": "Day 3", "score": 65},
            {"date": "Day 4", "score": 72},
            {"date": "Day 5", "score": 78}
        ]
    }
