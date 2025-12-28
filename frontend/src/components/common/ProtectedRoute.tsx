import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import { Spinner } from '../ui/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireApproval?: boolean;
  requireMember?: boolean;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireApproval = false,
  requireMember = false,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isApproved, isMember, isAdmin, isSuspended, user } = useAuth();

  // Show loading while checking auth
  if (requireAuth && !user && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Check if suspended
  if (isSuspended) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-city-background">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-soft text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-city-text mb-2">
            Account Suspended
          </h2>
          <p className="text-gray-600 mb-4">
            Your account has been suspended. Please contact admin for more information.
          </p>
          {user?.suspensionReason && (
            <p className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
              Reason: {user.suspensionReason}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Check approval
  if (requireApproval && !isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-city-background">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-soft text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-city-text mb-2">
            Approval Pending
          </h2>
          <p className="text-gray-600">
            Your account is awaiting admin approval. You will be notified once your account is approved.
          </p>
        </div>
      </div>
    );
  }

  // Check membership
  if (requireMember && !isMember) {
    return <Navigate to={ROUTES.JOIN_US} replace />;
  }

  // Check admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

