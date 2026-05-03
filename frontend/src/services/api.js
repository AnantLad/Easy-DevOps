import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// ====== AUTH ENDPOINTS ======
export const authAPI = {
  signup: (email, password, username) =>
    apiClient.post('/auth/signup', { email, password, username }),

  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  getProfile: () => apiClient.get('/auth/profile'),

  updateProfile: (data) => apiClient.patch('/auth/profile', data),
};

// ====== LAB ENDPOINTS ======
export const labAPI = {
  startLab: (taskId) => apiClient.post('/labs/start', { taskId }),

  getLabSession: (sessionId) => apiClient.get(`/labs/${sessionId}`),

  stopLab: (sessionId) => apiClient.delete(`/labs/${sessionId}`),

  getUserLabSessions: () => apiClient.get('/labs/user/sessions'),
};

// ====== TASK ENDPOINTS ======
export const taskAPI = {
  getAllTasks: () => apiClient.get('/tasks'),

  getTaskById: (taskId) => apiClient.get(`/tasks/${taskId}`),

  getTasksByCategory: (category) =>
    apiClient.get(`/tasks/category/${category}`),
};

// ====== VALIDATION ENDPOINTS ======
export const validationAPI = {
  validateTask: (taskId, input) =>
    apiClient.post(`/validation/${taskId}`, { input }),
};

// ====== PROGRESS ENDPOINTS ======
export const progressAPI = {
  getUserProgress: () => apiClient.get('/progress/user'),

  getLeaderboard: () => apiClient.get('/progress/leaderboard'),
};

// ====== SCORE ENDPOINTS ======
export const scoreAPI = {
  addScore: (taskId, points) =>
    apiClient.post('/scores', { taskId, points }),

  getUserScores: () => apiClient.get('/scores/user'),

  getTaskScores: (taskId) => apiClient.get(`/scores/task/${taskId}`),
};

export default apiClient;
