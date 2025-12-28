import axios from 'axios';
import { API_URL } from '../utils/constants';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle 401 Unauthorized - clear auth and redirect to login
      if (response.status === 401) {
        useAuthStore.getState().logout();
        useUIStore.getState().showAlert('Session expired. Please login again.', 'error');
        window.location.href = '/login';
      }
      
      // Handle 403 Forbidden
      if (response.status === 403) {
        useUIStore.getState().showAlert('Access denied.', 'error');
      }
      
      // Handle 404 Not Found
      if (response.status === 404) {
        useUIStore.getState().showAlert('Resource not found.', 'error');
      }
      
      // Handle 500 Server Error
      if (response.status >= 500) {
        useUIStore.getState().showAlert('Server error. Please try again later.', 'error');
      }
    } else {
      // Network error
      useUIStore.getState().showAlert('Network error. Please check your connection.', 'error');
    }
    
    return Promise.reject(error);
  }
);

export default api;

