import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Spinner } from '../../components/ui/Spinner';
import { useCloudinaryUpload } from '../../hooks/useCloudinaryUpload';
import { matrimonyService } from '../../services/matrimonyService';
import { useUIStore } from '../../store/uiStore';
import { matrimonyProfileSchema } from '../../utils/validators';
import { ROUTES } from '../../utils/constants';
import type { MatrimonyProfileInput } from '../../types/matrimony.types';

export const MatrimonyEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const showAlert = useUIStore((state) => state.showAlert);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MatrimonyProfileInput>({
    resolver: zodResolver(matrimonyProfileSchema),
  });

  const { uploadedUrls, setUploadedUrls, isUploading, uploadImages, removeImage } = useCloudinaryUpload({
    maxFiles: 5,
    folder: 'matrimony',
  });

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  const fetchProfile = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const profile = await matrimonyService.getProfile(id);
      
      // Set form values matching backend schema
      form.reset({
        fullName: profile.fullName,
        dateOfBirth: new Date(profile.dateOfBirth).toISOString().split('T')[0],
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        maritalStatus: profile.maritalStatus,
        phone: profile.phone,
        email: profile.email,
        currentAddress: profile.currentAddress,
        city: profile.city,
        state: profile.state,
        fatherName: profile.fatherName,
        motherName: profile.motherName,
        siblings: profile.siblings,
        familyDetails: profile.familyDetails,
        education: profile.education,
        occupation: profile.occupation,
        employerName: profile.employerName,
        annualIncome: profile.annualIncome,
        hobbies: profile.hobbies,
        aboutMe: profile.aboutMe,
        partnerPreferences: profile.partnerPreferences,
      });

      // Set existing photos
      if (profile.photos && profile.photos.length > 0) {
        const photoUrls = profile.photos.map((p: any) => p.url || p);
        setUploadedUrls(photoUrls);
      }
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Failed to load profile', 'error');
      navigate(ROUTES.ACCOUNT);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: MatrimonyProfileInput) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      // Format photos correctly
      const photosFormatted = uploadedUrls.map((url, index) => ({
        url,
        publicId: url.split('/').pop()?.split('.')[0] || `photo-${index}`,
        isProfile: index === 0,
      }));

      const profileData = {
        ...data,
        photos: photosFormatted,
      };

      await matrimonyService.updateProfile(id, profileData);
      showAlert('Profile updated successfully!', 'success');
      navigate(`/matrimony/profile/${id}`);
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-blue-city-text mb-8">Edit Matrimony Profile</h1>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Personal Info */}
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-bold text-blue-city-text mb-6">Personal Information</h2>
            <div className="space-y-6">
              <Input
                label="Full Name"
                {...form.register('fullName')}
                error={form.formState.errors.fullName?.message}
                required
              />
              
              <Input
                label="Date of Birth"
                type="date"
                {...form.register('dateOfBirth')}
                error={form.formState.errors.dateOfBirth?.message}
                required
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
              />
              
              <Select
                label="Gender"
                {...form.register('gender')}
                error={form.formState.errors.gender?.message}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
              
              <Input
                label="Height"
                {...form.register('height')}
                error={form.formState.errors.height?.message}
                required
                placeholder="e.g., 5'6'', 170cm"
              />
              
              <Input
                label="Weight (Optional)"
                {...form.register('weight')}
                error={form.formState.errors.weight?.message}
                placeholder="e.g., 65kg"
              />
              
              <Select
                label="Marital Status"
                {...form.register('maritalStatus')}
                error={form.formState.errors.maritalStatus?.message}
                required
              >
                <option value="">Select Marital Status</option>
                <option value="never_married">Never Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </Select>
            </div>
          </Card>

          {/* Contact Details */}
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-bold text-blue-city-text mb-6">Contact Details</h2>
            <div className="space-y-6">
              <Input
                label="Phone Number"
                type="tel"
                {...form.register('phone')}
                error={form.formState.errors.phone?.message}
                required
                placeholder="10-digit mobile number"
              />
              
              <Input
                label="Email"
                type="email"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
                required
              />
              
              <Textarea
                label="Current Address"
                rows={3}
                {...form.register('currentAddress')}
                value={form.watch('currentAddress') || ''}
                error={form.formState.errors.currentAddress?.message}
                required
              />
              
              <Input
                label="City"
                {...form.register('city')}
                error={form.formState.errors.city?.message}
                required
              />
              
              <Input
                label="State"
                {...form.register('state')}
                error={form.formState.errors.state?.message}
                required
              />
            </div>
          </Card>

          {/* Family Background */}
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-bold text-blue-city-text mb-6">Family Background</h2>
            <div className="space-y-6">
              <Input
                label="Father's Name (Optional)"
                {...form.register('fatherName')}
                error={form.formState.errors.fatherName?.message}
              />
              
              <Input
                label="Mother's Name (Optional)"
                {...form.register('motherName')}
                error={form.formState.errors.motherName?.message}
              />
              
              <Input
                label="Siblings (Optional)"
                {...form.register('siblings')}
                error={form.formState.errors.siblings?.message}
                placeholder="e.g., 1 Brother, 1 Sister"
              />
              
              <Textarea
                label="Family Details (Optional)"
                rows={4}
                {...form.register('familyDetails')}
                value={form.watch('familyDetails') || ''}
                error={form.formState.errors.familyDetails?.message}
                placeholder="Brief description about your family"
              />
            </div>
          </Card>

          {/* Education & Career */}
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-bold text-blue-city-text mb-6">Education & Career</h2>
            <div className="space-y-6">
              <Input
                label="Education"
                {...form.register('education')}
                error={form.formState.errors.education?.message}
                required
              />
              
              <Input
                label="Occupation"
                {...form.register('occupation')}
                error={form.formState.errors.occupation?.message}
                required
              />
              
              <Input
                label="Employer Name (Optional)"
                {...form.register('employerName')}
                error={form.formState.errors.employerName?.message}
              />
              
              <Input
                label="Annual Income (Optional)"
                {...form.register('annualIncome')}
                error={form.formState.errors.annualIncome?.message}
                placeholder="e.g., ₹10-12 LPA"
              />
            </div>
          </Card>

          {/* About & Preferences */}
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-bold text-blue-city-text mb-6">About & Preferences</h2>
            <div className="space-y-6">
              <Textarea
                label="Hobbies & Interests (Optional)"
                rows={4}
                {...form.register('hobbies')}
                value={form.watch('hobbies') || ''}
                error={form.formState.errors.hobbies?.message}
                placeholder="Your hobbies and interests"
                maxLength={500}
                showCharCount
              />
              
              <Textarea
                label="About Me (Optional)"
                rows={6}
                {...form.register('aboutMe')}
                value={form.watch('aboutMe') || ''}
                error={form.formState.errors.aboutMe?.message}
                placeholder="Tell about yourself"
                maxLength={1000}
                showCharCount
              />
              
              <Textarea
                label="Partner Preferences (Optional)"
                rows={6}
                {...form.register('partnerPreferences')}
                value={form.watch('partnerPreferences') || ''}
                error={form.formState.errors.partnerPreferences?.message}
                placeholder="Describe your ideal partner"
                maxLength={1000}
                showCharCount
              />
            </div>
          </Card>

          {/* Photos */}
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-bold text-blue-city-text mb-6">Photos</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-blue-city-text mb-2">
                  Upload Photos (Max 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => uploadImages(Array.from(e.target.files || []))}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-city-primary file:text-white hover:file:bg-blue-700 cursor-pointer"
                  disabled={isUploading || uploadedUrls.length >= 5}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {uploadedUrls.length} of 5 photos uploaded
                </p>
              </div>

              {isUploading && (
                <div className="flex items-center justify-center py-8">
                  <Spinner />
                </div>
              )}

              {uploadedUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-blue-city-primary text-white text-xs px-2 py-1 rounded">
                          Profile Photo
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.ACCOUNT)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <span className="flex items-center">
                  <Spinner size="sm" color="white" className="mr-2" />
                  Updating...
                </span>
              ) : (
                'Update Profile'
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

