@echo off
echo ==============================================
echo Starting Study Serenity Ecosystem...
echo ==============================================

:: Path to Python (using detected path)
set PYTHON_EXE="C:\Users\dell\AppData\Local\Programs\Python\Python311\python.exe"

:: 1. Start Python Backend (FastAPI)
echo Starting Backend on port 8000...
start "Study Serenity Backend" cmd /k "cd study-serenity-main\exam-anxiety-ai\backend && %PYTHON_EXE% -m uvicorn main:app --reload"

:: 2. Start React Web App (Vite)
echo Starting React App...
start "Study Serenity Web" cmd /k "cd study-serenity-main && npm run dev"

echo ==============================================
echo All services are launching in separate windows.
echo - Backend: http://127.0.0.1:8000/docs
echo - Web App: http://localhost:5173
echo ==============================================
pause
