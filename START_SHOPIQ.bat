@echo off
REM ShopIQ Startup Script for Windows
REM This script starts all services: Frontend, Backend, and AI Engine

echo.
echo ========================================
echo   ShopIQ - AI Shopping Assistant
echo   Startup Script
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "frontend" (
    echo ERROR: frontend folder not found. Run this from the shopiq root directory.
    pause
    exit /b 1
)

echo Starting ShopIQ services...
echo.

REM Terminal 1: Backend
echo [1/3] Starting Backend (Node.js)...
start "Backend - ShopIQ" cmd /k "cd backend && echo Activating dependencies... && npm run server"
timeout /t 3 /nobreak

REM Terminal 2: Frontend
echo [2/3] Starting Frontend (React/Vite)...
start "Frontend - ShopIQ" cmd /k "cd frontend && echo Installing dependencies if needed... && npm run dev"
timeout /t 3 /nobreak

REM Terminal 3: AI Engine
echo [3/3] Starting AI Engine (Python)...
start "AI Engine - ShopIQ" cmd /k "cd ai-engine && echo Activating Python venv... && venv\Scripts\activate.bat && echo Starting Flask API... && python api.py"
timeout /t 3 /nobreak

REM Terminal 4: Optional - Ollama
echo.
echo [Optional] To enable advanced AI responses:
echo   1. Install Ollama from https://ollama.ai
echo   2. Run: ollama pull llama3
echo   3. Run: ollama serve
echo.

echo.
echo ========================================
echo ✓ All services are starting...
echo ========================================
echo.
echo Frontend:  http://localhost:3000
echo Backend:   http://localhost:5000
echo AI Engine: http://localhost:5001
echo.
echo Press Ctrl+C in each terminal to stop services.
echo.

pause
