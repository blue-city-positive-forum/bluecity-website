import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import { useUIStore } from '../store/uiStore';

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, setLoading } = useAuthStore();
  const showAlert = useUIStore((state) => state.showAlert);

  // Refresh user data on mount if token exists
  useEffect(() => {
    const refreshUser = async () => {
      if (token && !user) {
        try {
          setLoading(true);
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to refresh user:', error);
          useAuthStore.getState().logout();
        } finally {
          setLoading(false);
        }
      }
    };

    refreshUser();
  }, [token, user, setUser, setLoading]);

  return {
    user,
    token,
    isAuthenticated,
    isApproved: user?.isApproved || false,
    isMember: user?.isMember || false,
    isAdmin: user?.isAdmin || false,
    isSuspended: user?.isSuspended || false,
  };
};

