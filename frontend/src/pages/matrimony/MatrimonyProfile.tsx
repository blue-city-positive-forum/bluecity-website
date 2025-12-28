import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useAuth } from '../../hooks/useAuth';
import { matrimonyService } from '../../services/matrimonyService';
import { useUIStore } from '../../store/uiStore';
import { ROUTES } from '../../utils/constants';
import type { MatrimonyProfile as IMatrimonyProfile } from '../../types/matrimony.types';

export const MatrimonyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const showAlert = useUIStore((state) => state.showAlert);

  const [profile, setProfile] = useState<IMatrimonyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  const fetchProfile = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const fetchedProfile = await matrimonyService.getProfileById(id);
      setProfile(fetchedProfile);
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Failed to load profile', 'error');
      navigate(ROUTES.MATRIMONY_LIST);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await matrimonyService.deleteProfile(id);
      showAlert('Profile deleted successfully', 'success');
      navigate(ROUTES.ACCOUNT);
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Failed to delete profile', 'error');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
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

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
          <h1 className="text-3xl font-bold text-blue-city-text mb-4">Profile Not Found</h1>
          <Button onClick={() => navigate(ROUTES.MATRIMONY_LIST)}>
            Back to Listings
          </Button>
        </div>
      </Layout>
    );
  }

  const isOwnProfile = user?._id === profile.userId;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <Link to={ROUTES.MATRIMONY_LIST}>
            <Button variant="outline" size="sm">
              ← Back to Listings
            </Button>
          </Link>
          {isOwnProfile && (
            <div className="flex gap-3">
              <Link to={`/matrimony/edit/${profile._id}`}>
                <Button variant="outline">Edit Profile</Button>
              </Link>
              <Button variant="outline" onClick={() => setShowDeleteDialog(true)}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Photos */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              {/* Main Photo */}
              <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden mb-4">
                {profile.photos && profile.photos[currentPhotoIndex] ? (
                  <img
                    src={profile.photos[currentPhotoIndex].url || profile.photos[currentPhotoIndex]}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Photo Thumbnails */}
              {profile.photos && profile.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {profile.photos.map((photo, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                        currentPhotoIndex === index ? 'border-blue-city-primary' : 'border-transparent'
                      }`}
                      onClick={() => setCurrentPhotoIndex(index)}
                    >
                      <img src={photo.url || photo} alt={`${profile.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Status Badges */}
              <div className="mt-4 space-y-2">
                {profile.isHidden && (
                  <Badge variant="warning" className="w-full justify-center">Hidden</Badge>
                )}
                {profile.paymentRequired && !profile.isPaid && (
                  <Badge variant="error" className="w-full justify-center">Payment Pending</Badge>
                )}
                {profile.isPaid && (
                  <Badge variant="success" className="w-full justify-center">Active</Badge>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-blue-city-text mb-2">
                    {profile.name}
                  </h1>
                  <Badge variant="info">
                    {profile.gender === 'male' ? 'Groom' : 'Bride'}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem label="Age" value={`${calculateAge(profile.dateOfBirth)} years`} />
                <InfoItem label="Height" value={profile.height} />
                <InfoItem label="Complexion" value={profile.complexion} />
                <InfoItem label="Marital Status" value={profile.maritalStatus.replace('_', ' ')} />
              </div>
            </Card>

            {/* Family Details */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-city-text mb-4">Family Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem label="Father's Name" value={profile.fatherName} />
                <InfoItem label="Mother's Name" value={profile.motherName} />
                <InfoItem label="Siblings" value={profile.siblings} />
                <InfoItem label="Family Type" value={profile.familyType} />
              </div>
            </Card>

            {/* Education & Career */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-city-text mb-4">Education & Career</h2>
              <div className="space-y-4">
                <InfoItem label="Education" value={profile.education} />
                <InfoItem label="Occupation" value={profile.occupation} />
                <InfoItem label="Annual Income" value={profile.annualIncome} />
              </div>
            </Card>

            {/* Lifestyle */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-city-text mb-4">Lifestyle</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem label="Diet" value={profile.diet} />
                <InfoItem label="Smoking" value={profile.smoking ? 'Yes' : 'No'} />
                <InfoItem label="Drinking" value={profile.drinking ? 'Yes' : 'No'} />
                {profile.hobbies && (
                  <InfoItem label="Hobbies" value={profile.hobbies} fullWidth />
                )}
              </div>
            </Card>

            {/* Partner Preferences */}
            {profile.partnerPreferences && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-blue-city-text mb-4">Partner Preferences</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{profile.partnerPreferences}</p>
              </Card>
            )}

            {/* Contact Information */}
            <Card className="p-6 bg-blue-city-secondary/20">
              <h2 className="text-2xl font-bold text-blue-city-text mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem label="Contact Person" value={profile.contactPerson} />
                <InfoItem label="Relationship" value={profile.relationship} />
                <InfoItem label="Phone" value={profile.contactPhone} />
                <InfoItem label="Email" value={profile.contactEmail} />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Profile"
        message="Are you sure you want to delete this profile? This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        variant="error"
        isLoading={isDeleting}
      />
    </Layout>
  );
};
// Helper component for displaying info
const InfoItem: React.FC<{ label: string; value: string; fullWidth?: boolean }> = ({ 
  label, 
  value, 
  fullWidth = false 
}) => (
  <div className={fullWidth ? 'md:col-span-2' : ''}>
    <div className="text-sm text-gray-500 mb-1">{label}</div>
    <div className="font-semibold text-blue-city-text capitalize">{value}</div>
  </div>
);


