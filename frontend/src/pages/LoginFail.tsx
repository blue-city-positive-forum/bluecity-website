import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../utils/constants';

export const LoginFail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const error = searchParams.get('error') || 'Authentication failed';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AuthLayout title="Login Failed">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-blue-city-text mb-4">
          Authentication Failed
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => navigate(ROUTES.LOGIN)}>
          Try Again
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          Redirecting to login in 5 seconds...
        </p>
      </div>
    </AuthLayout>
  );
};

