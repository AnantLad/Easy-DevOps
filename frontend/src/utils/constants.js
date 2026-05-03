// Deprecated: Use taskAPI.getAllTasks() instead
export const courses = [
  {
    id: 1,
    title: "Docker Basics",
    description:"Learn containers and Docker fundamentals.",
    level: "Beginner",
  },

  {
    id: 2,
    title: "Kubernetes Hands-on",
    description:"Deploy workloads inside Kubernetes.",
    level: "Intermediate",
  },

  {
    id: 3,
    title: "Linux for DevOps",
    description:"Master Linux commands and shell.",
    level: "Beginner",
  },

  {
    id: 4,
    title: "Terraform on AWS",
    description:"Provision cloud infrastructure using Terraform.",
    level: "Advanced",
  },
  {
    id: 5,
    title: "CI/CD Pipeline with Jenkins",
    description:"Running Scaleble pipeline.",
    level: "Advanced",
  }
];

// Difficulty levels with order
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

// Task categories
export const TASK_CATEGORIES = {
  LINUX: 'Linux',
  DOCKER: 'Docker',
  KUBERNETES: 'Kubernetes',
  DEVOPS: 'DevOps',
};

// Lab status constants
export const LAB_STATUS = {
  STARTING: 'starting',
  RUNNING: 'running',
  STOPPED: 'stopped',
  FAILED: 'failed',
  EXPIRED: 'expired',
};

// Route paths
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  LABS: '/labs',
  PROGRESS: '/progress',
};

// API error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  INVALID_EMAIL: 'Please enter a valid email.',
  INVALID_PASSWORD: 'Password must be at least 6 characters.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  CONFLICT: 'This resource already exists.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  TASK_COMPLETED: 'Task completed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// API timeouts (in milliseconds)
export const API_TIMEOUTS = {
  DEFAULT: 30000,
  SHORT: 10000,
  LONG: 60000,
};

// LocalStorage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  PREFERENCES: 'preferences',
};

export default {
  courses,
  DIFFICULTY_LEVELS,
  TASK_CATEGORIES,
  LAB_STATUS,
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  PAGINATION,
  API_TIMEOUTS,
  STORAGE_KEYS,
};