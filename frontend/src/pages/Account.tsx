import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { authService } from '../services/authService';
import { matrimonyService } from '../services/matrimonyService';
import { ROUTES } from '../utils/constants';
import { formatDate, formatRelativeTime } from '../utils/formatters';
import type { MatrimonyProfile } from '../types/matrimony.types';

export const Account: React.FC = () => {
  const { user, isApproved, isMember, isSuspended } = useAuth();
  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const showAlert = useUIStore((state) => state.showAlert);
  const [myProfiles, setMyProfiles] = useState<MatrimonyProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch fresh user data from backend
        const userData = await authService.getCurrentUser();
        setUser(userData);
        
        // Fetch user's matrimony profiles
        const profiles = await matrimonyService.getMyProfiles();
        setMyProfiles(profiles);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setUser]);

  const handleLogout = () => {
    logout();
    showAlert('Logged out successfully', 'success');
    navigate(ROUTES.HOME);
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-blue-city-text mb-8">My Account</h1>

        {/* User Info Card */}
        <Card className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-city-text mb-4">
                Profile Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-semibold w-32">Name:</span>
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Phone:</span>
                  <span>{user.phone}</span>
                </div>
                {user.createdAt && (
                  <div className="flex items-center">
                    <span className="font-semibold w-32">Member Since:</span>
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6">
                <Badge variant={isApproved ? 'success' : 'warning'}>
                  {isApproved ? '✓ Approved' : '⏳ Pending Approval'}
                </Badge>
                <Badge variant={isMember ? 'success' : 'default'}>
                  {isMember ? '⭐ Lifetime Member' : 'Non-Member'}
                </Badge>
                {user.isAdmin && (
                  <Badge variant="info">👑 Admin</Badge>
                )}
                {isSuspended && (
                  <Badge variant="error">🚫 Suspended</Badge>
                )}
              </div>
            </div>

            <div className="w-24 h-24 rounded-full bg-blue-city-primary flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </Card>

        {/* Membership Status */}
        {isApproved && !isMember && (
          <Card className="mb-6 bg-gradient-to-r from-blue-city-secondary/20 to-blue-city-accent/20 border-2 border-blue-city-accent">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-city-text mb-2">
                  Become a Lifetime Member
                </h3>
                <p className="text-gray-600 mb-4">
                  Get unlimited access to matrimony profiles and exclusive member benefits!
                </p>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  <li>✓ Create matrimony profiles for free</li>
                  <li>✓ Browse all matrimony listings</li>
                  <li>✓ Priority support</li>
                  <li>✓ Lifetime membership for entire family</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-city-primary">₹7,000</div>
                <div className="text-sm text-gray-600 mb-4">One-time payment</div>
                <Button size="lg" onClick={() => navigate(ROUTES.JOIN_US)}>
                  Join Now
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Waiting for Approval */}
        {!isApproved && (
          <Card className="mb-6 bg-yellow-50 border-2 border-yellow-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-yellow-800">Approval Pending</h3>
                <p className="text-sm text-yellow-700">
                  Your account is awaiting admin approval. You will be notified once approved.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* My Matrimony Profiles */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-city-text">
              My Matrimony Profiles
            </h2>
            {isApproved && (
              <Link to={ROUTES.MATRIMONY_CREATE}>
                <Button size="sm">+ Create New Profile</Button>
              </Link>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : myProfiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Matrimony Profiles Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first matrimony profile to get started
              </p>
              {isApproved && (
                <Link to={ROUTES.MATRIMONY_CREATE}>
                  <Button>Create Profile</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {myProfiles.map((profile) => (
                <Card key={profile._id} hover={true} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                      {profile.photos[0] ? (
                        <img
                          src={profile.photos[0]}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-blue-city-text">
                        {profile.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {profile.age} years • {profile.education}
                      </p>
                      <p className="text-sm text-gray-600">
                        {profile.occupation}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {profile.isHidden && (
                          <Badge variant="warning" size="sm">Hidden</Badge>
                        )}
                        {profile.paymentRequired && !profile.isPaid && (
                          <Badge variant="error" size="sm">Payment Pending</Badge>
                        )}
                        {profile.isPaid && (
                          <Badge variant="success" size="sm">Active</Badge>
                        )}
                        {profile.scheduledDeletion && (
                          <Badge variant="error" size="sm">Scheduled Deletion</Badge>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Link to={`/matrimony/profile/${profile._id}`}>
                          <Button size="sm" variant="outline">View</Button>
                        </Link>
                        <Link to={`/matrimony/edit/${profile._id}`}>
                          <Button size="sm" variant="outline">Edit</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-3">
                    Created {formatRelativeTime(profile.createdAt)}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          {user.isAdmin && (
            <Link to={ROUTES.ADMIN}>
              <Button variant="secondary">Admin Panel</Button>
            </Link>
          )}
          <Button variant="outline" onClick={() => setShowLogoutDialog(true)}>
            Logout
          </Button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        variant="warning"
      />
    </Layout>
  );
};

