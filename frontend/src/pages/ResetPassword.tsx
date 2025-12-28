import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { authService } from '../services/authService';
import { useUIStore } from '../store/uiStore';
import { resetPasswordRequestSchema, resetPasswordSchema } from '../utils/validators';
import { ROUTES } from '../utils/constants';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const showAlert = useUIStore((state) => state.showAlert);

  const requestForm = useForm({
    resolver: zodResolver(resetPasswordRequestSchema),
  });

  const resetForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleRequestReset = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await authService.requestPasswordReset(data);
      setEmailSent(true);
      showAlert('Password reset link sent to your email', 'success');
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Failed to send reset link', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: { newPassword: string }) => {
    if (!token) return;
    setIsLoading(true);
    try {
      await authService.resetPassword({ token, newPassword: data.newPassword });
      showAlert('Password reset successful! Please login.', 'success');
      setTimeout(() => navigate(ROUTES.LOGIN), 2000);
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Failed to reset password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password with token
  if (token) {
    return (
      <AuthLayout title="Set New Password" subtitle="Enter your new password">
        <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            {...resetForm.register('newPassword')}
            error={resetForm.formState.errors.newPassword?.message}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            {...resetForm.register('confirmPassword')}
            error={resetForm.formState.errors.confirmPassword?.message}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" color="white" /> : 'Reset Password'}
          </Button>
        </form>
      </AuthLayout>
    );
  }

  // Email sent confirmation
  if (emailSent) {
    return (
      <AuthLayout title="Check Your Email">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to your email. Please check your inbox and follow the instructions.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Didn't receive the email? Check your spam folder or try requesting again.
          </p>
          <div className="space-y-3">
            <Button variant="outline" onClick={() => setEmailSent(false)} className="w-full">
              Request Another Link
            </Button>
            <Button variant="outline" onClick={() => navigate(ROUTES.LOGIN)} className="w-full">
              Back to Login
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Request reset form
  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive a reset link">
      <form onSubmit={requestForm.handleSubmit(handleRequestReset)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your registered email"
          {...requestForm.register('email')}
          error={requestForm.formState.errors.email?.message}
          required
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" color="white" /> : 'Send Reset Link'}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Back to Login
        </Button>
      </form>
    </AuthLayout>
  );
};

