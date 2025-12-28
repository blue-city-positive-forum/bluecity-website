import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { adminService } from '../../services/adminService';
import { useUIStore } from '../../store/uiStore';
import { formatRelativeTime } from '../../utils/formatters';
import type { MatrimonyProfile } from '../../types/matrimony.types';

export const MatrimonyManagement: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<MatrimonyProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<MatrimonyProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'payment-pending' | 'hidden'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const showAlert = useUIStore((state) => state.showAlert);

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [profiles, filter, searchTerm]);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const fetchedProfiles = await adminService.getAllMatrimonies();
      setProfiles(fetchedProfiles);
    } catch (error) {
      showAlert('Failed to load matrimony profiles', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...profiles];

    // Apply status filter
    if (filter === 'active') {
      filtered = filtered.filter(p => p.isPaid && !p.isHidden);
    } else if (filter === 'payment-pending') {
      filtered = filtered.filter(p => p.paymentRequired && !p.isPaid);
    } else if (filter === 'hidden') {
      filtered = filtered.filter(p => p.isHidden);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.contactEmail.toLowerCase().includes(term)
      );
    }

    setFilteredProfiles(filtered);
  };

  const handleMarkCompleted = async (profileId: string) => {
    try {
      await adminService.markMatrimonyCompleted(profileId);
      showAlert('Profile marked as completed. It will be deleted after 2 weeks.', 'success');
      fetchProfiles();
    } catch (error) {
      showAlert('Failed to mark profile as completed', 'error');
    } finally {
      setShowConfirmDialog(false);
      setSelectedProfile(null);
    }
  };

  const handleToggleVisibility = async (profileId: string, hide: boolean) => {
    try {
      await adminService.toggleMatrimonyVisibility(profileId, hide);
      showAlert(`Profile ${hide ? 'hidden' : 'unhidden'} successfully`, 'success');
      fetchProfiles();
    } catch (error) {
      showAlert('Failed to toggle visibility', 'error');
    }
  };

  const handleDelete = async (profileId: string) => {
    try {
      await adminService.deleteMatrimony(profileId);
      showAlert('Profile deleted successfully', 'success');
      fetchProfiles();
    } catch (error) {
      showAlert('Failed to delete profile', 'error');
    }
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const activeProfiles = profiles.filter(p => p.isPaid && !p.isHidden);
  const paymentPendingProfiles = profiles.filter(p => p.paymentRequired && !p.isPaid);
  const hiddenProfiles = profiles.filter(p => p.isHidden);

  return (
    <DashboardLayout title="Matrimony Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-blue-50">
            <div className="text-2xl font-bold text-blue-city-primary">{profiles.length}</div>
            <div className="text-sm text-gray-600">Total Profiles</div>
          </Card>
          <Card className="p-4 bg-green-50">
            <div className="text-2xl font-bold text-green-600">{activeProfiles.length}</div>
            <div className="text-sm text-gray-600">Active Profiles</div>
          </Card>
          <Card className="p-4 bg-yellow-50">
            <div className="text-2xl font-bold text-yellow-600">{paymentPendingProfiles.length}</div>
            <div className="text-sm text-gray-600">Payment Pending</div>
          </Card>
          <Card className="p-4 bg-gray-50">
            <div className="text-2xl font-bold text-gray-600">{hiddenProfiles.length}</div>
            <div className="text-sm text-gray-600">Hidden</div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilter('all')}
                size="sm"
              >
                All ({profiles.length})
              </Button>
              <Button
                variant={filter === 'active' ? 'primary' : 'outline'}
                onClick={() => setFilter('active')}
                size="sm"
              >
                Active ({activeProfiles.length})
              </Button>
              <Button
                variant={filter === 'payment-pending' ? 'primary' : 'outline'}
                onClick={() => setFilter('payment-pending')}
                size="sm"
              >
                Pending ({paymentPendingProfiles.length})
              </Button>
              <Button
                variant={filter === 'hidden' ? 'primary' : 'outline'}
                onClick={() => setFilter('hidden')}
                size="sm"
              >
                Hidden ({hiddenProfiles.length})
              </Button>
            </div>
          </div>
        </Card>

        {/* Profiles List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : filteredProfiles.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500">No matrimony profiles found</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredProfiles.map((profile) => (
              <Card key={profile._id} className="p-6">
                <div className="flex items-start gap-6">
                  {/* Profile Photo */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {profile.photos[0] ? (
                      <img
                        src={profile.photos[0]}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Profile Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-blue-city-text mb-2">
                          {profile.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="info" size="sm">
                            {profile.gender === 'male' ? 'Groom' : 'Bride'}
                          </Badge>
                          {profile.isPaid ? (
                            <Badge variant="success" size="sm">Active</Badge>
                          ) : profile.paymentRequired ? (
                            <Badge variant="warning" size="sm">Payment Pending</Badge>
                          ) : (
                            <Badge variant="success" size="sm">Free (Member)</Badge>
                          )}
                          {profile.isHidden && (
                            <Badge variant="error" size="sm">Hidden</Badge>
                          )}
                          {profile.scheduledDeletion && (
                            <Badge variant="error" size="sm">Scheduled Deletion</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-semibold">Age:</span> {calculateAge(profile.dateOfBirth)} years
                      </div>
                      <div>
                        <span className="font-semibold">Height:</span> {profile.height}
                      </div>
                      <div>
                        <span className="font-semibold">Education:</span> {profile.education}
                      </div>
                      <div>
                        <span className="font-semibold">Occupation:</span> {profile.occupation}
                      </div>
                      <div>
                        <span className="font-semibold">Contact:</span> {profile.contactEmail}
                      </div>
                      <div>
                        <span className="font-semibold">Created:</span> {formatRelativeTime(profile.createdAt)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/matrimony/profile/${profile._id}`)}
                      >
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleVisibility(profile._id, !profile.isHidden)}
                      >
                        {profile.isHidden ? 'Unhide' : 'Hide'}
                      </Button>
                      {!profile.scheduledDeletion && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedProfile(profile._id);
                            setShowConfirmDialog(true);
                          }}
                        >
                          Mark Completed
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
                            handleDelete(profile._id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setSelectedProfile(null);
        }}
        onConfirm={() => selectedProfile && handleMarkCompleted(selectedProfile)}
        title="Mark as Completed"
        message="This will schedule the profile for deletion in 2 weeks. The profile will be hidden immediately. Are you sure?"
        confirmText="Mark Completed"
        variant="warning"
      />
    </DashboardLayout>
  );
};

