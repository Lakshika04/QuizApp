@echo off
echo Starting Quiz App Backend and Frontend...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Start Backend
echo Starting Backend Server...
cd backend
start cmd /k "npm start"
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Frontend Server...
cd ..\frontend
start cmd /k "npm run dev"

echo.
echo === QUIZ APP STARTED ===
echo.
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:5174 or http://localhost:5173
echo.
echo Press Ctrl+C in each terminal to stop the servers.
echo Login at /login, Signup at /signup
echo.
pause
