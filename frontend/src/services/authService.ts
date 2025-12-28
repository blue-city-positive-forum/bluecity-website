import api from './api';
import type { 
  LoginCredentials, 
  RegisterData, 
  OTPVerification, 
  ResetPasswordRequest, 
  ResetPasswordData,
  AuthResponse,
  User
} from '../types/auth.types';

export const authService = {
  // Register with email and password
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<any>('/auth/register', data);
    return response.data;
  },

  // Verify OTP after registration
  verifyOTP: async (data: OTPVerification): Promise<AuthResponse> => {
    const response = await api.post<any>('/auth/verify-otp', data);
    // Backend returns data nested in 'data' property
    const user = response.data.data?.user;
    // Normalize user object - backend uses 'id', frontend expects '_id'
    if (user && user.id && !user._id) {
      user._id = user.id;
    }
    return {
      message: response.data.message,
      token: response.data.data?.token,
      user,
    };
  },

  // Login with email and password
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<any>('/auth/login', credentials);
    // Backend returns data nested in 'data' property
    const user = response.data.data?.user;
    // Normalize user object - backend uses 'id', frontend expects '_id'
    if (user && user.id && !user._id) {
      user._id = user.id;
    }
    return {
      message: response.data.message,
      token: response.data.data?.token,
      user,
    };
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<any>('/auth/me');
    const user = response.data.data?.user || response.data.user;
    // Normalize user object
    if (user && user.id && !user._id) {
      user._id = user.id;
    }
    return user;
  },

  // Request password reset
  requestPasswordReset: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/forgot-password', data);
    return response.data;
  },

  // Reset password with token
  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    // Clear local storage is handled by authStore
    // You can add a logout API call here if needed
  },
};

