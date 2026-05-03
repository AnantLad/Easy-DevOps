# Frontend - Quick Reference Guide

## 🚀 Getting Started

### Prerequisites
- Backend running on `http://localhost:5000`
- MongoDB and Redis running
- Node.js installed

### Installation
```bash
cd frontend
npm install
npm run dev
```

Opens at: `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── services/
│   └── api.js                 ← API client with all endpoints
├── context/
│   └── AuthContext.jsx        ← Global auth state
├── pages/
│   ├── auth/
│   │   └── Login.jsx          ← Login/Signup page
│   ├── dashboard/
│   │   ├── Dashboard.jsx      ← Tasks & stats
│   │   └── Progress.jsx       ← Leaderboard & progress
│   └── lab/
│       └── LabPage.jsx        ← Lab workspace
├── components/
│   ├── dashboard/
│   │   ├── CourseCard.jsx     ← Task card
│   │   └── StatsCard.jsx      ← Stat display
│   ├── lab/
│   │   ├── TaskDescription.jsx ← Task details
│   │   ├── LabHeader.jsx      ← Lab header
│   │   ├── ProgressTracker.jsx ← Progress bar
│   │   └── CheckButton.jsx    ← Validation button
│   ├── terminal/
│   │   └── TerminalWindow.jsx ← Terminal output
│   ├── layout/
│   │   ├── Navbar.jsx         ← Header
│   │   └── Sidebar.jsx        ← Menu
│   └── common/
│       └── Card.jsx           ← Card wrapper
├── routes/
│   ├── AppRoutes.jsx          ← Route definitions
│   └── ProtectedRoute.jsx     ← Auth wrapper
├── layouts/
│   ├── MainLayout.jsx         ← Main layout
│   └── AuthLayout.jsx         ← Auth layout
├── utils/
│   └── constants.js           ← Constants
├── styles/
│   └── globals.css            ← Tailwind styles
├── App.jsx                    ← Root component
└── main.jsx                   ← Entry point
```

---

## 🔑 Core Concepts

### 1. AuthContext - Global Auth State
```javascript
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const MyComponent = () => {
  const { token, user, login, logout, loading } = useContext(AuthContext);
  
  // Use anywhere to access auth state
};
```

### 2. API Service - All Endpoints
```javascript
import { 
  authAPI, 
  labAPI, 
  taskAPI, 
  progressAPI 
} from "@/services/api";

// All endpoints available here
const user = await authAPI.getProfile();
const tasks = await taskAPI.getAllTasks();
```

### 3. Protected Routes
```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

## 🌐 API Integration Examples

### Fetch User Profile
```javascript
import { authAPI } from "@/services/api";

const profile = await authAPI.getProfile();
// Returns: { username, email, totalScore, ... }
```

### Start Lab
```javascript
import { labAPI } from "@/services/api";

const session = await labAPI.startLab("taskId123");
// Returns: { _id, containerId, status, ... }
```

### Get All Tasks
```javascript
import { taskAPI } from "@/services/api";

const tasks = await taskAPI.getAllTasks();
// Returns: [{ _id, title, difficulty, points, ... }, ...]
```

### Validate Task
```javascript
import { validationAPI } from "@/services/api";

const result = await validationAPI.validateTask(
  "taskId", 
  "user input"
);
// Returns: { success: true/false, message, output }
```

### Get Progress
```javascript
import { progressAPI } from "@/services/api";

const progress = await progressAPI.getUserProgress();
// Returns: { tasksCompleted, totalScore, taskProgress: [...] }
```

---

## 🎯 Component Props

### CourseCard
```javascript
<CourseCard
  id="task123"
  title="Linux Basics"
  description="Learn Linux commands"
  level="Beginner"
  category="Linux"
  points={100}
/>
```

### TaskDescription
```javascript
<TaskDescription
  title="Create a User"
  description="Task description text"
  instructions={["Step 1", "Step 2"]}
  hints={["Hint 1", "Hint 2"]}
  difficulty="Beginner"
  points={100}
/>
```

### LabHeader
```javascript
<LabHeader
  sessionId="sess123"
  taskTitle="Linux Basics"
  taskDifficulty="Beginner"
/>
```

### ProgressTracker
```javascript
<ProgressTracker
  taskId="task123"
/>
```

### TerminalWindow
```javascript
<TerminalWindow
  sessionId="sess123"
/>
```

---

## 📱 Page Navigation

| Page | URL | Auth Required | Purpose |
|------|-----|---------------|---------|
| Login | `/login` | No | Authentication |
| Dashboard | `/dashboard` | Yes | Task overview |
| Labs | `/labs?taskId=X` | Yes | Lab workspace |
| Progress | `/progress` | Yes | Progress tracking |

---

## 🔐 Authentication Flow

### 1. Signup
```javascript
const { signup } = useContext(AuthContext);
const result = await signup(email, password, username);
// Auto-redirects on success
```

### 2. Login
```javascript
const { login } = useContext(AuthContext);
const result = await login(email, password);
// Auto-redirects on success
```

### 3. Token Management
- Token auto-stored in localStorage
- Auto-injected in all API requests
- Auto-cleared on 401 error
- Auto-logout on expiration

### 4. Logout
```javascript
const { logout } = useContext(AuthContext);
logout(); // Clears token & user
```

---

## ⚡ Common Patterns

### Fetch Data in useEffect
```javascript
import { useState, useEffect } from "react";
import { taskAPI } from "@/services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await taskAPI.getAllTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* render tasks */}</div>;
};
```

### Navigate to Lab
```javascript
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const navigate = useNavigate();
  
  const startLab = (taskId) => {
    navigate(`/labs?taskId=${taskId}`);
  };
};
```

### Use Auth Context
```javascript
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const MyComponent = () => {
  const { user, token, loading, error } = useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>;
  if (!token) return <div>Not authenticated</div>;
  
  return <div>Hello {user?.username}</div>;
};
```

---

## 🐛 Debugging Tips

### Check Network Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Watch API calls to `http://localhost:5000/api/*`

### Check Console Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors from API or component

### Check Auth State
```javascript
// In browser console:
localStorage.getItem("token")
localStorage.getItem("user")
```

### Check API Status
```bash
# In terminal:
curl http://localhost:5000/api/health
```

---

## 🚨 Common Issues & Solutions

### "Cannot GET /api/tasks"
- ❌ Backend not running
- ✅ Start backend: `npm run dev` in backend folder

### "Unauthorized (401)"
- ❌ Token expired or invalid
- ✅ Clear localStorage & login again

### "Cannot connect to API"
- ❌ CORS not configured
- ✅ Check backend has `CORS_ORIGIN=http://localhost:5173`

### "WebSocket not connecting"
- ❌ Socket.io not working
- ✅ Check backend terminal socket is initialized

### "Tasks not loading"
- ❌ Database empty
- ✅ Ensure MongoDB has task data

---

## 📝 Component Template

```javascript
import { useState, useEffect } from "react";
import { someAPI } from "@/services/api";

const MyComponent = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await someAPI.method(id);
        setData(result);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {/* Render data */}
    </div>
  );
};

export default MyComponent;
```

---

## 🎨 Tailwind CSS Classes Used

- `bg-slate-*` - Background colors
- `text-cyan-*` - Primary text (cyan)
- `border-slate-*` - Borders
- `hover:bg-*` - Hover effects
- `flex`, `grid` - Layouts
- `rounded-lg` - Border radius
- `p-*`, `m-*` - Padding/margin
- `w-*`, `h-*` - Width/height

---

## 📚 Environment Configuration

Create `.env` in frontend root:
```
VITE_API_URL=http://localhost:5000/api
```

Accessed via:
```javascript
import.meta.env.VITE_API_URL
```

---

## 🔄 Testing Workflow

1. **Start Backend**
   ```bash
   cd backend && npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd frontend && npm run dev
   ```

3. **Open Browser**
   ```
   http://localhost:5173
   ```

4. **Login**
   - Create account or login

5. **Test Features**
   - View dashboard
   - Start a task
   - Validate task
   - Check progress

---

## 📖 For More Info

- **API Docs**: See `backend/docs/api.md`
- **Architecture**: See `backend/docs/architecture.md`
- **Backend Setup**: See `backend/QUICKSTART.md`
- **Integration Details**: See `FRONTEND_INTEGRATION.md`

---

## ✅ Checklist for New Development

- [ ] Use `authAPI`, `taskAPI`, etc. for all API calls
- [ ] Wrap async operations in try-catch
- [ ] Show loading spinners during fetches
- [ ] Display error messages to user
- [ ] Use AuthContext for auth state
- [ ] Protect routes with ProtectedRoute
- [ ] Use component props instead of hardcoded data
- [ ] Test with actual backend data
- [ ] Check browser console for errors
- [ ] Verify network requests in DevTools

---

**Happy Coding!** 🚀
