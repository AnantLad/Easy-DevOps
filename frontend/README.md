# Easy DevOps - Frontend

Modern React-based frontend for the Easy DevOps learning platform. Interactive labs, progress tracking, and real-time terminal emulation.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Backend API running on `http://localhost:5000`

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Opens at `http://localhost:5173`

## 📋 Features

- ✅ User authentication (Signup/Login)
- ✅ Task dashboard with real-time data
- ✅ Interactive lab environment
- ✅ Real-time terminal via WebSocket
- ✅ Progress tracking & leaderboard
- ✅ Task validation & scoring
- ✅ Responsive design
- ✅ Error handling & loading states
- ✅ Dark theme optimized UI

## 🛠️ Tech Stack

- **Framework:** React 19.2.5
- **Styling:** Tailwind CSS 4.2.4
- **Routing:** React Router 7.14.2
- **HTTP Client:** Axios 1.15.2
- **Real-time:** Socket.io Client 4.8.3
- **Notifications:** React Hot Toast 2.6.0
- **Terminal:** Xterm 5.3.0
- **Build Tool:** Vite 8.0.10

## 📁 Project Structure

```
src/
├── services/
│   └── api.js                    # API client with all endpoints
├── context/
│   └── AuthContext.jsx           # Global auth state
├── hooks/
│   └── useAuth.js                # useAuth hook
├── pages/
│   ├── auth/
│   │   └── Login.jsx             # Authentication page
│   ├── dashboard/
│   │   ├── Dashboard.jsx         # Tasks overview
│   │   └── Progress.jsx          # Leaderboard & stats
│   └── lab/
│       └── LabPage.jsx           # Lab workspace
├── components/
│   ├── dashboard/
│   │   ├── CourseCard.jsx
│   │   └── StatsCard.jsx
│   ├── lab/
│   │   ├── TaskDescription.jsx
│   │   ├── LabHeader.jsx
│   │   ├── ProgressTracker.jsx
│   │   └── CheckButton.jsx
│   ├── terminal/
│   │   └── TerminalWindow.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── common/
│       ├── Card.jsx
│       ├── LoadingSpinner.jsx
│       └── ErrorBoundary.jsx
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── layouts/
│   ├── MainLayout.jsx
│   └── AuthLayout.jsx
├── utils/
│   ├── constants.js
│   ├── formatters.js
│   ├── validators.js
│   └── toast.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

## 🔌 API Integration

### Setup Environment

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
VITE_ENV=development
```

### Available Endpoints

**Authentication (4)**
- `POST /auth/signup` - Create account
- `POST /auth/login` - Login
- `GET /auth/profile` - Get user profile
- `PATCH /auth/profile` - Update profile

**Labs (4)**
- `POST /labs/start` - Start lab session
- `GET /labs/:id` - Get session details
- `DELETE /labs/:id` - Stop lab
- `GET /labs/user/sessions` - Get user sessions

**Tasks (3)**
- `GET /tasks` - All tasks
- `GET /tasks/:id` - Single task
- `GET /tasks/category/:category` - By category

**Validation (1)**
- `POST /validation/:id` - Validate task

**Progress (2)**
- `GET /progress/user` - User progress
- `GET /progress/leaderboard` - Rankings

**Scores (3)**
- `POST /scores` - Add score
- `GET /scores/user` - User scores
- `GET /scores/task/:id` - Task scores

## 🎯 Usage Examples

### Using the useAuth Hook

```javascript
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { user, token, login, logout, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!token) return <div>Not authenticated</div>;
  
  return <div>Hello {user?.username}</div>;
};
```

### Fetching Data with API

```javascript
import { taskAPI, progressAPI } from '@/services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    taskAPI.getAllTasks()
      .then(setTasks)
      .catch(err => console.error(err));
  }, []);
  
  return <div>{/* render tasks */}</div>;
};
```

### Using Toast Notifications

```javascript
import { toastSuccess, toastError } from '@/utils/toast';

const MyComponent = () => {
  const handleSubmit = async () => {
    try {
      await someAPI.call();
      toastSuccess('Success!');
    } catch (err) {
      toastError(err.message);
    }
  };
};
```

### Form Validation

```javascript
import { isValidEmail, validatePassword } from '@/utils/validators';

const validateForm = () => {
  if (!isValidEmail(email)) {
    toastError('Invalid email');
    return false;
  }
  
  const pwdValidation = validatePassword(password);
  if (!pwdValidation.isValid) {
    toastError(pwdValidation.errors[0]);
    return false;
  }
  
  return true;
};
```

### Text Formatting

```javascript
import { formatDate, formatScore, getDifficultyColor } from '@/utils/formatters';

<div>
  <p>Created: {formatDate(task.createdAt)}</p>
  <p>Score: {formatScore(50, 100)}</p>
  <span className={getDifficultyColor(task.difficulty)}>
    {task.difficulty}
  </span>
</div>
```

## 🔐 Authentication

### Login Flow

1. User visits `/login`
2. Enters email and password
3. Frontend calls `authAPI.login()`
4. Backend validates and returns JWT token
5. Token stored in localStorage
6. Auto-included in all future requests
7. Redirect to dashboard on success

### Token Management

- Tokens auto-stored in localStorage
- Auto-injected in `Authorization` header
- Auto-cleared on 401 (unauthorized)
- Auto-logout if token expires

### Protected Routes

All non-login routes require a valid token:

```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## 🎨 Components

### LoadingSpinner

```javascript
<LoadingSpinner size="md" text="Loading..." />
<LoadingSpinner size="lg" fullScreen text="Processing..." />
```

### ErrorBoundary

Automatically catches React component errors:

```javascript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Card

Reusable card component:

```javascript
<Card className="hover:border-cyan-500">
  Card content here
</Card>
```

## 🚀 Build & Deploy

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Output in `dist/` directory

### Preview Build

```bash
npm run preview
```

## 📊 Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### Can't connect to backend
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env`
- Verify CORS is enabled in backend

### Token errors
- Clear localStorage and login again
- Check JWT_SECRET in backend matches
- Verify token hasn't expired

### WebSocket not connecting
- Check Socket.io is running on backend
- Verify port 5000 is accessible
- Check browser console for errors

### Tasks not loading
- Check `/api/tasks` endpoint works
- Verify MongoDB has data
- Check network tab in DevTools

## 📚 Documentation

- [API Integration Guide](./FRONTEND_INTEGRATION.md)
- [Quick Reference](./QUICK_REFERENCE.md)
- [Backend Docs](../backend/README.md)
- [Architecture Guide](../backend/docs/architecture.md)

## 🤝 Contributing

1. Follow the existing code structure
2. Use React hooks and functional components
3. Keep components small and reusable
4. Add error handling and loading states
5. Use meaningful variable names
6. Test with actual backend data

## 📝 Code Style

- **Naming:** camelCase for variables, PascalCase for components
- **Formatting:** 2-space indentation
- **Imports:** Group by type (React, libraries, local)
- **Comments:** Meaningful comments for complex logic

## 🔒 Security

- ✅ JWT token authentication
- ✅ Auto token injection
- ✅ CORS configured
- ✅ Error message sanitization
- ✅ Protected routes
- ✅ Secure localStorage usage

## ⚠️ Known Issues

None currently. Please report issues via GitHub.

## 📄 License

Part of the Easy DevOps project.

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review console errors
3. Check backend logs
4. Verify API endpoints

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)

---

**Happy Learning!** 🚀
