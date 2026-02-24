# Quiz Application - Getting Started Guide

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB connection string (already configured in .env)

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Verify Environment Configuration
Check that `.env` file contains:
```
MONGODB_URL=mongodb+srv://lakshikabourai_db_user:P1jJSq3hoTZumQVK@cluster0.d5dbfux.mongodb.net/?appName=Cluster0
JWT_SECRET=quiz_app_secret_key_2024
NODE_ENV=development
PORT=4000
```

### Step 4: Start the Backend Server
```bash
npm start
```

Expected output:
```
server is running on port 4000
database is connected successfully
```

The backend API will be available at: `http://localhost:4000`

---

## Frontend Setup

### Step 1: Open New Terminal & Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

Expected output will show the local development URL (typically `http://localhost:5173`)

---

## Application Usage

### First Time User
1. Open the application in your browser
2. Click "Login" button in the top right (or bottom of page on mobile)
3. Click "create account" link
4. Fill in the signup form with:
   - Full Name
   - Email
   - Password (minimum 6 characters)
5. Click "create account"

### Taking a Quiz
1. After login, you'll see the home page with technology options
2. Select a technology (HTML, CSS, JavaScript, React, etc.)
3. Select a difficulty level (Basic, Intermediate, or Advanced)
4. Answer all quiz questions (click next after each answer)
5. Review your results and click "Save Result"

### Viewing Results
1. Click "Results" button in the navbar (top right)
2. View all your quiz attempts with scores and performance badges
3. Filter results by technology using the filter buttons

### Logout
1. Click "Logout" button in the navbar

---

## File Structure Summary

### Backend
```
backend/
├── server.js                 # Main server file
├── .env                      # Environment configuration
├── package.json
└── src/
    ├── config/db.js         # Database connection
    ├── models/
    │   ├── userModel.js     # User schema
    │   └── resultModel.js   # Quiz result schema
    ├── controllers/
    │   ├── userController.js    # Auth logic (register/login)
    │   └── resultController.js  # Quiz result logic
    ├── middleware/
    │   └── auth.js          # JWT authentication
    └── routes/
        ├── userRoutes.js    # Auth routes
        └── resultRoutes.js  # Result routes
```

### Frontend
```
frontend/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx              # Main router
    ├── components/
    │   ├── Login.jsx        # Login page
    │   ├── Signup.jsx       # Signup page
    │   ├── Navbar.jsx       # Navigation bar
    │   └── SideBar.jsx      # Quiz interface
    ├── pages/
    │   ├── Home.jsx         # Home page
    │   └── Results.jsx      # Results page
    └── assets/
        ├── dummydata.js     # Quiz questions
        └── dummystyle.js    # Tailwind styles
```

---

## Key Features

✅ **User Authentication**
   - Secure registration and login
   - Password hashing with bcryptjs
   - JWT token-based authentication

✅ **Quiz System**
   - 10 technologies (HTML, CSS, JS, React, Node, MongoDB, Java, Python, C++, Bootstrap)
   - 3 difficulty levels (Basic, Intermediate, Advanced)
   - 20-60 questions per level
   - Multiple choice questions

✅ **Results Management**
   - Score calculation and storage
   - Performance rating (Excellent, Good, Average, Needs Work)
   - Filter results by technology
   - View historical quiz attempts

✅ **Responsive Design**
   - Mobile-friendly interface
   - Desktop optimized layout
   - Smooth animations and transitions

---

## Troubleshooting

### Backend won't start
- Check if MongoDB connection URL is correct in `.env`
- Verify port 4000 is not in use: `netstat -ano | findstr :4000`
- Check Node.js version: `node --version`

### Frontend won't load
- Clear browser cache: `Ctrl+Shift+Delete`
- Try `npm run build` if development server fails
- Check if backend is running at `http://localhost:4000`

### Login/Signup not working
- Check browser console for errors (F12 → Console tab)
- Verify backend is running and API is accessible
- Check network tab to see if requests are reaching the API

### Database connection failed
- Verify MongoDB connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure VPN is not interfering with connection

---

## API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Results
- `POST /api/results` - Save quiz result
- `GET /api/results` - Get all user results
- `GET /api/results?technology=html` - Filter by technology

---

## Performance Scenarios

### All questions correct
- Score: 100%
- Performance: Excellent

### 85-99% correct
- Performance: Excellent

### 65-84% correct
- Performance: Good

### 45-64% correct
- Performance: Average

### Below 45% correct
- Performance: Needs work

---

## Notes

- Quiz answers are randomized for each user
- Results are stored permanently in the database
- You can retake quizzes multiple times
- Each quiz attempt is saved as a separate result
- The application uses JWT tokens for secure authentication
- Passwords are hashed before storage

---

## Support

If you encounter any issues:
1. Check the console (F12) for error messages
2. Verify backend is running
3. Check MongoDB connection
4. Clear browser cache and reload

Happy quizzing! 🎓
