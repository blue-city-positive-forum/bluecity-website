import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import { useUIStore } from '../store/uiStore';
import { ROUTES } from '../utils/constants';
import { Spinner } from '../components/ui/Spinner';

export const LoginSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const showAlert = useUIStore((state) => state.showAlert);

  useEffect(() => {
    const handleSuccess = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        showAlert('Invalid login link', 'error');
        navigate(ROUTES.LOGIN);
        return;
      }

      try {
        // Set token first
        useAuthStore.getState().setToken(token);
        
        // Fetch user data
        const user = await authService.getCurrentUser();
        login(user, token);
        showAlert('Login successful!', 'success');
        navigate(ROUTES.ACCOUNT);
      } catch (error) {
        showAlert('Failed to complete login', 'error');
        navigate(ROUTES.LOGIN);
      }
    };

    handleSuccess();
  }, [searchParams, navigate, login, showAlert]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-city-background">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-blue-city-text font-medium">Completing login...</p>
      </div>
    </div>
  );
};

