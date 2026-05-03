# Frontend Setup & Utilities Guide

Complete guide to using all utilities, hooks, and components in the Easy DevOps frontend.

## 📦 What Was Added

### ✅ Custom Hooks
- **`useAuth`** - Easy access to authentication context

### ✅ Utility Modules
- **`formatters.js`** - Text formatting functions
- **`validators.js`** - Form validation functions
- **`toast.js`** - Toast notification utilities
- **`constants.js`** - Application constants (expanded)

### ✅ Components
- **`LoadingSpinner`** - Reusable loading indicator
- **`ErrorBoundary`** - Error handling wrapper

### ✅ Configuration
- **`.env.example`** - Environment template
- **`main.jsx`** - Updated with ErrorBoundary and Toaster
- **`index.html`** - Better meta tags
- **`README.md`** - Comprehensive documentation

---

## 🎣 Custom Hooks

### useAuth Hook

Access authentication state and methods easily:

```javascript
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { 
    token,      // JWT token
    user,       // User object { username, email, totalScore, ... }
    loading,    // Loading state
    error,      // Error message
    login,      // login(email, password)
    signup,     // signup(email, password, username)
    logout,     // logout()
    updateProfile // updateProfile(data)
  } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!token) return <div>Not authenticated</div>;

  return <div>Hello {user?.username}</div>;
};
```

**Throws error if used outside AuthProvider**

---

## 📝 Formatters (src/utils/formatters.js)

Text formatting utilities:

### getDifficultyColor(difficulty)
```javascript
import { getDifficultyColor } from '@/utils/formatters';

const color = getDifficultyColor('Beginner');
// Returns: 'bg-green-500/20 text-green-400 border-green-500/30'

<span className={getDifficultyColor(task.difficulty)}>
  {task.difficulty}
</span>
```

**Supported:** 'Beginner', 'Intermediate', 'Advanced'

### formatDate(date)
```javascript
import { formatDate } from '@/utils/formatters';

<p>Created: {formatDate(task.createdAt)}</p>
// Output: "May 3, 2026"
```

### formatDateTime(date)
```javascript
import { formatDateTime } from '@/utils/formatters';

<p>Updated: {formatDateTime(user.updatedAt)}</p>
// Output: "May 3, 2026, 02:30 PM"
```

### formatScore(score, maxScore)
```javascript
import { formatScore } from '@/utils/formatters';

<p>{formatScore(75, 100)}</p>
// Output: "75/100 (75%)"
```

### formatPercentage(value, decimals)
```javascript
import { formatPercentage } from '@/utils/formatters';

<p>Progress: {formatPercentage(0.75, 1)}</p>
// Output: "75.0%"
```

### truncateText(text, length)
```javascript
import { truncateText } from '@/utils/formatters';

<p>{truncateText('Long description...', 20)}</p>
// Output: "Long description... ..."
```

### formatDuration(seconds)
```javascript
import { formatDuration } from '@/utils/formatters';

<p>Time: {formatDuration(125)}</p>
// Output: "2:05"
```

### capitalize(text)
```javascript
import { capitalize } from '@/utils/formatters';

capitalize('hello'); // "Hello"
```

### camelCaseToTitleCase(text)
```javascript
import { camelCaseToTitleCase } from '@/utils/formatters';

camelCaseToTitleCase('taskCompleted'); // "Task Completed"
```

---

## ✅ Validators (src/utils/validators.js)

Form validation utilities:

### isValidEmail(email)
```javascript
import { isValidEmail } from '@/utils/validators';

if (!isValidEmail(email)) {
  showError('Invalid email');
}
```

### validatePassword(password)
```javascript
import { validatePassword } from '@/utils/validators';

const result = validatePassword('Password123');
// Returns:
// {
//   isValid: true,
//   errors: []
// }

// Or if invalid:
// {
//   isValid: false,
//   errors: ['Password must contain uppercase...', '...']
// }

if (!result.isValid) {
  result.errors.forEach(err => showError(err));
}
```

**Requirements:**
- At least 6 characters
- Contains uppercase letter
- Contains number

### isValidUsername(username)
```javascript
import { isValidUsername } from '@/utils/validators';

if (!isValidUsername(username)) {
  showError('Invalid username (3-20 chars, alphanumeric + underscore)');
}
```

### isRequired(value, fieldName)
```javascript
import { isRequired } from '@/utils/validators';

const result = isRequired(email, 'Email');
if (!result.isValid) {
  showError(result.error); // "Email is required"
}
```

### minLength(value, minLength, fieldName)
```javascript
import { minLength } from '@/utils/validators';

const result = minLength(password, 6, 'Password');
if (!result.isValid) {
  showError(result.error);
}
```

### maxLength(value, maxLength, fieldName)
```javascript
import { maxLength } from '@/utils/validators';

const result = maxLength(bio, 200, 'Bio');
```

### isValidUrl(url)
```javascript
import { isValidUrl } from '@/utils/validators';

if (!isValidUrl(websiteUrl)) {
  showError('Invalid URL');
}
```

### validateFileSize(file, maxSizeInMB)
```javascript
import { validateFileSize } from '@/utils/validators';

const result = validateFileSize(file, 5); // 5MB max
if (!result.isValid) {
  showError(result.error);
}
```

### validateFileType(file, allowedTypes)
```javascript
import { validateFileType } from '@/utils/validators';

const result = validateFileType(file, ['image/jpeg', 'image/png']);
if (!result.isValid) {
  showError(result.error);
}
```

---

## 🔔 Toast Notifications (src/utils/toast.js)

React Hot Toast integration:

### toastSuccess(message, options)
```javascript
import { toastSuccess } from '@/utils/toast';

toastSuccess('Profile updated successfully!');
// Options: { duration, position, ...rest }
```

### toastError(message, options)
```javascript
import { toastError } from '@/utils/toast';

toastError('Failed to save changes');
```

### toastInfo(message, options)
```javascript
import { toastInfo } from '@/utils/toast';

toastInfo('Tip: Use keyboard shortcuts for faster navigation');
```

### toastLoading(message)
```javascript
import { toastLoading } from '@/utils/toast';

const toastId = toastLoading('Submitting form...');
// Later:
dismissToast(toastId);
toastSuccess('Form submitted!');
```

### toastPromise(promise, messages)
```javascript
import { toastPromise } from '@/utils/toast';

toastPromise(
  apiCall(),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Failed to save'
  }
);
```

### dismissToast(toastId)
```javascript
import { dismissToast } from '@/utils/toast';

const id = toastLoading('Processing...');
dismissToast(id); // Dismiss specific toast
```

### dismissAllToasts()
```javascript
import { dismissAllToasts } from '@/utils/toast';

dismissAllToasts(); // Clear all notifications
```

### Example: Complete Form Handling
```javascript
import { toastPromise, toastError } from '@/utils/toast';
import { isValidEmail, validatePassword } from '@/utils/validators';
import { authAPI } from '@/services/api';

const handleSignup = async (email, password, username) => {
  // Validate
  if (!isValidEmail(email)) {
    toastError('Invalid email address');
    return;
  }

  const pwdValidation = validatePassword(password);
  if (!pwdValidation.isValid) {
    toastError(pwdValidation.errors[0]);
    return;
  }

  // Submit with promise toast
  toastPromise(
    authAPI.signup(email, password, username),
    {
      loading: 'Creating account...',
      success: 'Account created successfully!',
      error: err => err.message || 'Failed to create account'
    }
  );
};
```

---

## 🎨 Components

### LoadingSpinner

Reusable loading indicator:

```javascript
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Basic usage
<LoadingSpinner />

// With text
<LoadingSpinner text="Loading tasks..." />

// Different sizes
<LoadingSpinner size="sm" text="Small" />  // w-6 h-6
<LoadingSpinner size="md" text="Medium" /> // w-10 h-10 (default)
<LoadingSpinner size="lg" text="Large" />  // w-16 h-16

// Full screen overlay
<LoadingSpinner fullScreen text="Processing..." />
```

### ErrorBoundary

Wrap components to catch errors:

```javascript
import ErrorBoundary from '@/components/common/ErrorBoundary';

<ErrorBoundary>
  <Dashboard />
  <LabPage />
</ErrorBoundary>
```

Features:
- Catches React component errors
- Shows error details in development
- Provides "Try Again" and "Go Home" buttons
- Resets error state

---

## 🗂️ Constants (src/utils/constants.js)

Centralized constants:

```javascript
import { 
  DIFFICULTY_LEVELS,
  TASK_CATEGORIES,
  LAB_STATUS,
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS
} from '@/utils/constants';

// Difficulty levels
console.log(DIFFICULTY_LEVELS.BEGINNER);    // 'Beginner'
console.log(DIFFICULTY_LEVELS.INTERMEDIATE); // 'Intermediate'
console.log(DIFFICULTY_LEVELS.ADVANCED);     // 'Advanced'

// Task categories
console.log(TASK_CATEGORIES.LINUX);        // 'Linux'
console.log(TASK_CATEGORIES.DOCKER);       // 'Docker'
console.log(TASK_CATEGORIES.KUBERNETES);   // 'Kubernetes'
console.log(TASK_CATEGORIES.DEVOPS);       // 'DevOps'

// Lab statuses
console.log(LAB_STATUS.STARTING);   // 'starting'
console.log(LAB_STATUS.RUNNING);    // 'running'
console.log(LAB_STATUS.STOPPED);    // 'stopped'
console.log(LAB_STATUS.FAILED);     // 'failed'
console.log(LAB_STATUS.EXPIRED);    // 'expired'

// Routes
console.log(ROUTES.LOGIN);         // '/login'
console.log(ROUTES.DASHBOARD);     // '/dashboard'
console.log(ROUTES.LABS);          // '/labs'
console.log(ROUTES.PROGRESS);      // '/progress'

// Messages
console.log(ERROR_MESSAGES.UNAUTHORIZED);    // 'Unauthorized...'
console.log(SUCCESS_MESSAGES.LOGIN_SUCCESS); // 'Logged in successfully!'

// Storage keys
const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
const user = localStorage.getItem(STORAGE_KEYS.USER);
```

---

## 🔧 Environment Configuration

Create `.env` file from `.env.example`:

```env
# Required
VITE_API_URL=http://localhost:5000/api

# Optional
VITE_BACKEND_URL=http://localhost:5000
VITE_ENV=development
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const env = import.meta.env.VITE_ENV;
```

---

## 📋 Common Patterns

### Complete Form Component

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toastError, toastSuccess } from '@/utils/toast';
import { isValidEmail, validatePassword } from '@/utils/validators';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!isValidEmail(email)) {
      toastError('Invalid email address');
      return;
    }

    const pwdValidation = validatePassword(password);
    if (!pwdValidation.isValid) {
      toastError(pwdValidation.errors[0]);
      return;
    }

    // Submit
    setLoading(true);
    try {
      const result = await signup(email, password, username);
      if (result.success) {
        toastSuccess('Account created successfully!');
        navigate('/dashboard');
      } else {
        toastError(result.error);
      }
    } catch (err) {
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Sign Up'}
      </button>
    </form>
  );
};
```

### Data Fetching with Loading

```javascript
import { useState, useEffect } from 'react';
import { taskAPI } from '@/services/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { toastError } from '@/utils/toast';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskAPI.getAllTasks();
        setTasks(data);
      } catch (err) {
        toastError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <LoadingSpinner text="Loading tasks..." />;

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>{task.title}</div>
      ))}
    </div>
  );
};
```

---

## ✨ Best Practices

1. **Always use `useAuth` hook** instead of direct context access
2. **Use formatters** for consistent text display
3. **Use validators** for form validation before submission
4. **Use toasts** for user feedback
5. **Wrap components with `ErrorBoundary`** at page level
6. **Use `LoadingSpinner`** for async operations
7. **Use constants** instead of magic strings
8. **Handle errors** with try-catch and show user feedback

---

## 🐛 Debugging

### Check Auth State
```javascript
// In console:
localStorage.getItem('token')
localStorage.getItem('user')
```

### Check API Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by XHR
4. Check API responses

### Check Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages

---

## 📚 File Locations Quick Reference

```
src/
├── hooks/
│   └── useAuth.js           ← useAuth hook
├── utils/
│   ├── formatters.js        ← Text formatting
│   ├── validators.js        ← Form validation
│   ├── toast.js             ← Notifications
│   └── constants.js         ← App constants
├── components/common/
│   ├── LoadingSpinner.jsx   ← Loading indicator
│   ├── ErrorBoundary.jsx    ← Error handler
│   └── Card.jsx             ← Card wrapper
└── services/
    └── api.js               ← API client
```

---

## 🎓 Summary

**You now have:**
- ✅ Custom authentication hook
- ✅ Text formatting utilities
- ✅ Form validation utilities
- ✅ Toast notification system
- ✅ Error boundary component
- ✅ Loading spinner component
- ✅ Centralized constants
- ✅ Complete documentation

**Ready to build amazing features!** 🚀
