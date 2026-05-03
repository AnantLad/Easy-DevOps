# 🚀 Quick Start Commands

Complete reference for setting up and running the Easy DevOps project.

---

## 📋 Prerequisites

```bash
# Check Node.js version
node --version  # Should be 16+ (recommended 18+)

# Check npm version
npm --version   # Should be 8+

# Check MongoDB (should be installed)
mongod --version

# Check Redis (should be installed)
redis-server --version
```

---

## 🔥 Full Setup (First Time)

### 1. Start Databases

**Terminal 1 - MongoDB:**
```bash
# On Windows (if using WSL or MongoDB service)
mongod

# Or if installed as service
# Already running in background
```

**Terminal 2 - Redis:**
```bash
# On Windows (if using WSL)
redis-server

# Or if installed as service
# Already running in background
```

**Verify:**
```bash
# Check MongoDB
mongo --eval "db.version()"

# Check Redis
redis-cli ping  # Should return: PONG
```

---

## 🔧 Backend Setup

### 1. Navigate to Backend
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
# Create .env file
cp .env .env  # Or manually create with these variables:

# .env file contents:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/easy-devops
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

### 3. Start Backend
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

**Expected Output:**
```
Server running on port 5000
MongoDB connected
Redis connected
```

---

## 💻 Frontend Setup

### 1. Navigate to Frontend
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
# Create .env file
cp .env.example .env

# Or manually create with:
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
VITE_ENV=development
```

### 4. Start Frontend
```bash
# Development mode
npm run dev

# Should output:
# VITE v8.0.10 ready in xxx ms
# ➜  Local:   http://localhost:5173/
# ➜  Press q to quit
```

**Open in Browser:** http://localhost:5173

---

## ✅ Verify Everything Works

### 1. Check Backend API
```bash
# In terminal or browser
curl http://localhost:5000/api/health

# Or use any API testing tool (Postman, Insomnia)
GET http://localhost:5000/api/tasks
```

### 2. Check Frontend
```bash
# Open browser and navigate to
http://localhost:5173

# Should see login page
# No console errors
```

### 3. Test Authentication
```bash
# In browser console
localStorage.clear()  # Clear any old tokens

# 1. Go to login page
# 2. Click "Create Account"
# 3. Fill in: email@example.com, password123, username
# 4. Click "Sign Up"
# 5. Should redirect to dashboard
```

### 4. Check Console
```bash
# Open DevTools (F12)
# Console tab should be clean (no errors)
# Network tab should show successful API calls
```

---

## 🎯 Complete Command Sequence

### All-in-One Quick Start (4 Terminals)

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Redis:**
```bash
redis-server
```

**Terminal 3 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 4 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## 🔄 Common Commands

### Backend Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Check dependencies
npm list
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Check dependencies
npm list
```

### Database Commands
```bash
# MongoDB - Connect to database
mongo

# Check MongoDB version
mongod --version

# Check MongoDB connection
mongo --eval "db.version()"

# Redis - Connect to Redis
redis-cli

# Check Redis
redis-cli ping

# Flush Redis (clear all data)
redis-cli FLUSHALL
```

---

## 🐛 Troubleshooting Commands

### Check if Ports are in Use
```bash
# Check if port 5000 is in use (backend)
netstat -ano | findstr :5000

# Check if port 5173 is in use (frontend)
netstat -ano | findstr :5173

# Check if port 27017 is in use (MongoDB)
netstat -ano | findstr :27017

# Check if port 6379 is in use (Redis)
netstat -ano | findstr :6379
```

### Kill Process on Port
```bash
# On Windows - Kill process on port 5000
taskkill /PID <PID> /F

# Get PID first with netstat command above
```

### Clear Node Modules and Reinstall
```bash
# Backend
cd backend
rm -r node_modules package-lock.json  # Or remove manually
npm install

# Frontend
cd frontend
rm -r node_modules package-lock.json  # Or remove manually
npm install
```

### Clear Caches
```bash
# Node
npm cache clean --force

# Frontend build cache
cd frontend
rm -r dist/

# Backend (if applicable)
# Usually no build cache for Node
```

### Check Environment Variables
```bash
# Backend - verify .env is loaded
# Check server.js console output

# Frontend - check env variables
# In browser console, type:
import.meta.env.VITE_API_URL
```

---

## 🔐 Reset Everything

```bash
# 1. Stop all servers (Ctrl+C in each terminal)

# 2. Clear databases
mongo --eval "db.dropDatabase()"
redis-cli FLUSHALL

# 3. Clear node modules
cd backend && rm -r node_modules
cd ../frontend && rm -r node_modules

# 4. Clear cache
npm cache clean --force

# 5. Reinstall
cd backend && npm install
cd ../frontend && npm install

# 6. Restart everything
# Terminal 1: mongod
# Terminal 2: redis-server
# Terminal 3: cd backend && npm run dev
# Terminal 4: cd frontend && npm run dev
```

---

## 📊 Expected Output

### Backend Startup
```
🔧 Initializing Express server...
✅ Database connected to: mongodb://localhost:27017/easy-devops
✅ Redis connected on port: 6379
✅ Express middleware configured
✅ Socket.io initialized
🚀 Server running on http://localhost:5000
📝 Log level: debug
```

### Frontend Startup
```
  VITE v8.0.10  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  press q to quit
```

### Successful API Call
```
GET http://localhost:5000/api/tasks
Status: 200
Response: [
  {
    _id: "...",
    title: "Task Name",
    description: "...",
    ...
  }
]
```

---

## 🎓 Common Issues & Solutions

### Issue: MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
```bash
# Start MongoDB
mongod

# Or verify mongod is running
mongo --eval "db.version()"
```

### Issue: Redis Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```
**Solution:**
```bash
# Start Redis
redis-server

# Or verify Redis is running
redis-cli ping  # Should return PONG
```

### Issue: Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Kill process on port 5000
# Find PID: netstat -ano | findstr :5000
# Kill: taskkill /PID <PID> /F

# Or use different port
PORT=5001 npm run dev  # Backend

# Frontend uses dynamic port, should auto-increment
```

### Issue: CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Check CORS_ORIGIN in backend .env matches frontend URL
- Should be: http://localhost:5173
- Restart backend

### Issue: Token Errors
```
401 Unauthorized
```
**Solution:**
```bash
# Clear browser storage
localStorage.clear()

# Clear cookies
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});

# Login again
```

### Issue: npm install fails
```
Error: npm ERR! code ERESOLVE
```
**Solution:**
```bash
# Use legacy dependency resolution
npm install --legacy-peer-deps

# Or clear cache first
npm cache clean --force
npm install
```

---

## 📱 Testing Features

### Test Login
```bash
# 1. Go to http://localhost:5173
# 2. Click "Create Account"
# 3. Enter:
#    Email: test@example.com
#    Password: TestPass123
#    Username: testuser
# 4. Click Sign Up
# 5. Should be redirected to dashboard
```

### Test Dashboard
```bash
# 1. Should see tasks loading
# 2. Click any task card
# 3. Should navigate to lab page
# 4. Task description should load
```

### Test Lab
```bash
# 1. Click "Start Task"
# 2. Terminal window should appear
# 3. Type command in input
# 4. Click "Check"
# 5. Should see validation result
```

### Test WebSocket (Terminal)
```bash
# 1. In Lab page, terminal should show:
#    "Connected to lab environment"
# 2. Commands should execute in real-time
# 3. Output should stream in terminal
```

---

## 📊 Useful Curl Commands

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### Get User Progress
```bash
curl http://localhost:5000/api/progress/user \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Leaderboard
```bash
curl http://localhost:5000/api/progress/leaderboard
```

---

## 🔒 Security Reminders

1. **Never commit .env files**
2. **Change JWT_SECRET in production**
3. **Use HTTPS in production**
4. **Set CORS_ORIGIN to your domain**
5. **Use strong passwords for MongoDB**
6. **Keep dependencies updated**
7. **Run security audits regularly**

---

## 📚 Useful Files

- **Backend Setup:** `backend/QUICKSTART.md`
- **Backend APIs:** `backend/docs/api.md`
- **Backend Architecture:** `backend/docs/architecture.md`
- **Frontend Setup:** `frontend/SETUP_GUIDE.md`
- **Frontend Integration:** `frontend/FRONTEND_INTEGRATION.md`
- **Quick Reference:** `frontend/QUICK_REFERENCE.md`

---

## ✅ Checklist Before Going Live

- [ ] Both servers running
- [ ] Databases connected
- [ ] No console errors
- [ ] Login works
- [ ] Dashboard loads tasks
- [ ] Lab page loads
- [ ] Terminal connects
- [ ] Task validation works
- [ ] Progress updates
- [ ] Leaderboard shows data
- [ ] Logout works
- [ ] Protected routes work
- [ ] Error messages display
- [ ] Loading spinners work
- [ ] Notifications appear

---

## 🎉 You're Ready!

All commands above will get your project running. If you encounter any issues, refer to the troubleshooting section or check the full documentation files.

**Happy coding! 🚀**
