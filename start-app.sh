#!/bin/bash

echo "Starting Quiz App Backend and Frontend..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Start Backend in background
echo "Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!
sleep 3

# Start Frontend in new terminal
echo "Starting Frontend Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "=== QUIZ APP STARTED ==="
echo ""
echo "Backend:  http://localhost:4000"
echo "Frontend: http://localhost:5173 or http://localhost:5174"
echo ""
echo "Login at /login, Signup at /signup"
echo ""

# Wait for the processes
wait $BACKEND_PID $FRONTEND_PID
