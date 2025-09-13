import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  // Register new user
  register: async (name, email, password, preferredGenres) => {
    const response = await axiosInstance.post('/auth/register', {
      name,
      email,
      password,
      preferredGenres: preferredGenres && preferredGenres.length > 0 ? preferredGenres : null,
    });
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Get user profile
  getUserProfile: async () => {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await axiosInstance.put('/user/profile', userData);
    return response.data;
  },
};

export default authService;