import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Spinner } from '../components/ui/Spinner';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { loginSchema, registerSchema, otpSchema } from '../utils/validators';
import { ROUTES, API_URL } from '../utils/constants';
import type { LoginCredentials, RegisterData, OTPVerification } from '../types/auth.types';

export const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const showAlert = useUIStore((state) => state.showAlert);

  const loginForm = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const otpForm = useForm<OTPVerification>({
    resolver: zodResolver(otpSchema),
  });

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      if (response.token && response.user) {
        login(response.user, response.token);
        showAlert('Login successful!', 'success');
        navigate(ROUTES.ACCOUNT);
      }
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      setRegisteredEmail(data.email);
      // Set email in OTP form for validation
      otpForm.setValue('email', data.email);
      setShowOTPModal(true);
      showAlert('OTP sent to your email', 'success');
      registerForm.reset();
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (data: OTPVerification) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyOTP({ ...data, email: registeredEmail });
      if (response.token && response.user) {
        login(response.user, response.token);
        showAlert('Registration successful!', 'success');
        setShowOTPModal(false);
        navigate(ROUTES.ACCOUNT);
      }
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'OTP verification failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <AuthLayout
      title={mode === 'login' ? 'Welcome back' : 'Create an account'}
      subtitle={mode === 'login' ? 'Sign in to your account' : 'Join our community today'}
    >
      <div className="space-y-6">
        {/* Tab switcher */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              mode === 'login'
                ? 'bg-white text-blue-city-primary shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              mode === 'register'
                ? 'bg-white text-blue-city-primary shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {mode === 'login' ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              {...loginForm.register('email')}
              error={loginForm.formState.errors.email?.message}
              required
            />
            <Input
              label="Password"
              type="password"
              {...loginForm.register('password')}
              error={loginForm.formState.errors.password?.message}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" color="white" /> : 'Sign In'}
            </Button>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <Input
              label="Full Name"
              {...registerForm.register('name')}
              error={registerForm.formState.errors.name?.message}
              required
            />
            <Input
              label="Email"
              type="email"
              {...registerForm.register('email')}
              error={registerForm.formState.errors.email?.message}
              required
            />
            <Input
              label="Phone (10 digits)"
              type="tel"
              {...registerForm.register('phone')}
              error={registerForm.formState.errors.phone?.message}
              required
            />
            <Input
              label="Password"
              type="password"
              {...registerForm.register('password')}
              error={registerForm.formState.errors.password?.message}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" color="white" /> : 'Create Account'}
            </Button>
          </form>
        )}

        {/* Google Login */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-blue-city-background text-gray-500">Or continue with</span>
          </div>
        </div>

        <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
      </div>

      {/* OTP Modal */}
      <Modal isOpen={showOTPModal} onClose={() => setShowOTPModal(false)} title="Verify OTP">
        <form onSubmit={otpForm.handleSubmit(handleOTPVerify)} className="space-y-4">
          <p className="text-gray-600 mb-4">
            We've sent a 6-digit OTP to {registeredEmail}
          </p>
          {/* Hidden email field for validation */}
          <input type="hidden" {...otpForm.register('email')} value={registeredEmail} />
          <Input
            label="Enter OTP"
            {...otpForm.register('otp')}
            error={otpForm.formState.errors.otp?.message}
            maxLength={6}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" color="white" /> : 'Verify'}
          </Button>
        </form>
      </Modal>
    </AuthLayout>
  );
};

