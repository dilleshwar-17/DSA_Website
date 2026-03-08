# Quick Start Guide - DSA Platform

Get up and running in 5 minutes!

## Prerequisites

- Node.js v16+ installed
- MongoDB installed and running
- Git installed

## Installation Steps

### 1. Install MongoDB (if not installed)

**Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Install and start MongoDB service
net start MongoDB
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

### 2. Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-platform
JWT_SECRET=your-secret-key-here
NODE_ENV=development" > .env

# Start backend server
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 3. Frontend Setup (2 minutes)

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at `http://localhost:3000`

### 4. Access the Platform

Open your browser and go to:
```
http://localhost:3000
```

## First Steps

### 1. Create an Account
- Click "Sign Up" in the navbar
- Enter your details
- Or use "Continue with Google"

### 2. Browse Problems
- Click "Problems" in navbar
- Filter by category or difficulty
- Click any problem to start solving

### 3. Try a Visualization
- Click "Visualizations" in navbar
- Select "Arrays" → "Bubble Sort"
- Click "Play" to see the animation

### 4. Solve Your First Problem
- Go to Problems → "Two Sum"
- Write your solution in the code editor
- Click "Run Code" to test
- Click "Submit" when ready

### 5. Check Your Progress
- Click "Dashboard" in navbar
- View your solved problems
- Track your learning progress

## Common Commands

### Backend
```bash
cd backend

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test
```

### Frontend
```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl status mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Default Test Account

For testing purposes:
```
Email: test@example.com
Password: test123
```

## Project Structure

```
dsa-platform/
├── backend/          # API server
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   └── server.js     # Entry point
│
└── frontend/         # Web application
    ├── pages/        # Next.js pages
    ├── components/   # React components
    └── styles/       # CSS styles
```

## Key Features to Try

### 1. Code Playground
- Multi-language support (Python, Java, C++, JS)
- Real-time code execution
- Test case validation

### 2. Algorithm Visualizations
- Interactive animations
- Step-by-step execution
- Speed controls

### 3. Learning Roadmap
- Structured learning paths
- Beginner to Advanced tracks
- Progress tracking

### 4. Dashboard
- Problems solved statistics
- Difficulty distribution charts
- Weekly activity graphs
- Learning path progress

## Next Steps

1. **Explore Documentation**
   - Read `README.md` for detailed info
   - Check `API_DOCUMENTATION.md` for API details
   - Review `SETUP_GUIDE.md` for advanced setup

2. **Customize**
   - Modify problems in `backend/data/problems.json`
   - Add new visualizations in `frontend/components/visualizations/`
   - Create custom themes in `frontend/styles/globals.css`

3. **Deploy**
   - Follow `SETUP_GUIDE.md` deployment section
   - Deploy backend to Heroku
   - Deploy frontend to Vercel

## Useful Links

- **Home**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Problems**: http://localhost:3000/problems
- **Visualizations**: http://localhost:3000/visualizations
- **Dashboard**: http://localhost:3000/dashboard

## Support

Need help?
- Check `README.md` for detailed documentation
- Review `SETUP_GUIDE.md` for troubleshooting
- Open an issue on GitHub
- Join our Discord community

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Save any file to see changes instantly
- No need to restart servers

### Dark Mode
Toggle dark mode using the moon/sun icon in navbar

### Code Editor Shortcuts
- `Ctrl/Cmd + S`: Save
- `Ctrl/Cmd + /`: Comment
- `Ctrl/Cmd + F`: Find
- `Ctrl/Cmd + Z`: Undo

## What's Included

✅ 500+ coding problems
✅ 200+ algorithm visualizations
✅ 50+ UI pages
✅ Full authentication system
✅ Progress tracking dashboard
✅ Code playground with Monaco editor
✅ Learning roadmap
✅ Leaderboard
✅ Dark/Light mode
✅ Responsive design

## Quick Commands Reference

```bash
# Start everything
cd backend && npm run dev &
cd frontend && npm run dev

# Stop everything
# Press Ctrl+C in both terminals

# Reset database
mongo dsa-platform --eval "db.dropDatabase()"

# View logs
# Backend logs appear in backend terminal
# Frontend logs appear in frontend terminal
```

## Success Checklist

- [ ] MongoDB is running
- [ ] Backend server started (port 5000)
- [ ] Frontend server started (port 3000)
- [ ] Can access http://localhost:3000
- [ ] Can create an account
- [ ] Can browse problems
- [ ] Can view visualizations
- [ ] Can access dashboard

## Congratulations! 🎉

You're now ready to start learning DSA with our platform!

Happy Coding! 💻
