# 🌿 AI-Driven Exam Anxiety Reduction App

A "student-first" application designed to reduce exam anxiety through AI-generated micro-goals, gentle reassurance, and progress tracking without pressure.

## ✨ Features

*   **Daily Micro-Goals**: AI analyzes weak topics and generates 2-4 small, achievable goals (20 mins max) to prevent overwhelm.
*   **Confidence Score**: A transparent score (0-100) based on consistency and effort, *not* just test marks.
*   **Gentle Encouragement**: AI provides supportive, non-judgmental feedback to keep motivation high.
*   **Trend Tracking**: Visualizes confidence growth over time.
*   **Offline Robustness**: The UI never crashes; it provides comforting fallbacks if the internet or backend is down.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), TypeScript, Tailwind CSS, Recharts
*   **Backend**: Python, FastAPI
*   **AI/Logic**: Custom Python engines for Goal Generation and Sentiment Analysis

## 🚀 How to Run

The easiest way to start the app is to use the automated launcher:

1.  Go to the project root on your Desktop.
2.  Double-click **`run_app.bat`**.

This will automatically open:
*   **Backend API** at `http://localhost:8000/docs`
*   **Web App** at `http://localhost:5173`

### Manual Start (Terminal)

**Backend:**
```bash
cd study-serenity-main/exam-anxiety-ai/backend
python -m uvicorn main:app --reload
```

**Frontend:**
```bash
cd study-serenity-main
npm run dev
```

## 🧠 Project Philosophy

This tool is built on the principle that **consistency > perfection**. We avoid red warning colors, allow students to "hide" explanations, and ensure that every interaction reduces cognitive load.