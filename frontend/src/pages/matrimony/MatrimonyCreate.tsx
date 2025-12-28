import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Spinner } from '../../components/ui/Spinner';
import { useAuth } from '../../hooks/useAuth';
import { useCloudinaryUpload } from '../../hooks/useCloudinaryUpload';
import { useRazorpay } from '../../hooks/useRazorpay';
import { matrimonyService } from '../../services/matrimonyService';
import { paymentService } from '../../services/paymentService';
import { useUIStore } from '../../store/uiStore';
import { matrimonyProfileSchema } from '../../utils/validators';
import { ROUTES, MATRIMONY_PRICE } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import type { MatrimonyProfileInput } from '../../types/matrimony.types';

const STEPS = [
  'Personal Info',
  'Contact Details',
  'Family Background',
  'Education & Career',
  'About & Preferences',
  'Photos',
  'Review & Submit',
];

export const MatrimonyCreate: React.FC = () => {
  const { user, isMember } = useAuth();
  const navigate = useNavigate();
  const showAlert = useUIStore((state) => state.showAlert);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProfileId, setCreatedProfileId] = useState<string | null>(null);

  const form = useForm<MatrimonyProfileInput>({
    resolver: zodResolver(matrimonyProfileSchema),
    mode: 'onChange',
    defaultValues: {
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const { uploadedImages, uploadedUrls, isUploading, uploadImages, removeImage } = useCloudinaryUpload({
    maxFiles: 5,
    folder: 'matrimony',
  });

  const { initiatePayment, isLoading: razorpayLoading } = useRazorpay({
    onSuccess: async (response) => {
      if (!createdProfileId) return;
      try {
        await paymentService.verifyMatrimonyPayment(createdProfileId, {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        showAlert('Payment successful! Your profile is now active.', 'success');
        navigate(`/matrimony/profile/${createdProfileId}`);
      } catch (error) {
        showAlert('Payment verification failed. Please contact support.', 'error');
      }
    },
    onFailure: () => {
      showAlert('Payment failed. Your profile is saved but inactive.', 'error');
      navigate(ROUTES.ACCOUNT);
    },
  });

  // Calculate age when DOB changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'dateOfBirth' && value.dateOfBirth) {
        const dob = new Date(value.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        form.setValue('age', age);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: MatrimonyProfileInput) => {
    setIsSubmitting(true);
    try {
      // Transform photos to correct format
      const photosFormatted = uploadedImages.map((image, index) => ({
        url: image.url,
        publicId: image.publicId,
        isProfile: index === 0,
      }));

      // Prepare profile data
      const profileData = {
        ...data,
        photos: photosFormatted,
      };

      const profile = await matrimonyService.createProfile(profileData);
      setCreatedProfileId(profile._id);

      // If payment required (non-member), initiate payment
      if (profile.paymentRequired && !profile.isPaid) {
        const orderData = await paymentService.createMatrimonyOrder(profile._id);
        await initiatePayment(
          orderData.orderId,
          orderData.amount,
          `Matrimony Profile - ${data.fullName}`,
          data.email,
          data.fullName
        );
      } else {
        showAlert('Profile created successfully!', 'success');
        navigate(`/matrimony/profile/${profile._id}`);
      }
    } catch (error: any) {
      console.error('Profile creation error:', error);
      showAlert(error.response?.data?.message || 'Failed to create profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldsForStep = (step: number): (keyof MatrimonyProfileInput)[] => {
    switch (step) {
      case 0: // Personal Info
        return ['fullName', 'dateOfBirth', 'gender', 'height', 'weight', 'maritalStatus'];
      case 1: // Contact
        return ['phone', 'email', 'currentAddress', 'city', 'state'];
      case 2: // Family
        return ['fatherName', 'motherName', 'siblings', 'familyDetails'];
      case 3: // Education & Career
        return ['education', 'occupation', 'employerName', 'annualIncome'];
      case 4: // About & Preferences
        return ['hobbies', 'aboutMe', 'partnerPreferences'];
      case 5: // Photos
        return []; // No form fields, just file upload
      case 6: // Review
        return []; // Review step
      default:
        return [];
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <Input
              label="Full Name"
              {...form.register('fullName')}
              error={form.formState.errors.fullName?.message}
              required
              placeholder="Enter your full name"
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
        );

      case 1:
        return (
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
              placeholder="your.email@example.com"
            />
            
            <Textarea
              label="Current Address"
              rows={3}
              {...form.register('currentAddress')}
              value={form.watch('currentAddress') || ''}
              error={form.formState.errors.currentAddress?.message}
              required
              placeholder="House/Flat No., Street, Area"
            />
            
            <Input
              label="City"
              {...form.register('city')}
              error={form.formState.errors.city?.message}
              required
              placeholder="Enter city"
            />
            
            <Input
              label="State"
              {...form.register('state')}
              error={form.formState.errors.state?.message}
              required
              placeholder="Enter state"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Input
              label="Father's Name (Optional)"
              {...form.register('fatherName')}
              error={form.formState.errors.fatherName?.message}
              placeholder="Enter father's name"
            />
            
            <Input
              label="Mother's Name (Optional)"
              {...form.register('motherName')}
              error={form.formState.errors.motherName?.message}
              placeholder="Enter mother's name"
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
              placeholder="Brief description about your family background, values, etc."
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Input
              label="Education"
              {...form.register('education')}
              error={form.formState.errors.education?.message}
              required
              placeholder="e.g., B.Tech in Computer Science"
            />
            
            <Input
              label="Occupation"
              {...form.register('occupation')}
              error={form.formState.errors.occupation?.message}
              required
              placeholder="e.g., Software Engineer"
            />
            
            <Input
              label="Employer Name (Optional)"
              {...form.register('employerName')}
              error={form.formState.errors.employerName?.message}
              placeholder="e.g., TCS, Infosys, Self-Employed"
            />
            
            <Input
              label="Annual Income (Optional)"
              {...form.register('annualIncome')}
              error={form.formState.errors.annualIncome?.message}
              placeholder="e.g., ₹10-12 LPA"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Textarea
              label="Hobbies & Interests (Optional)"
              rows={4}
              {...form.register('hobbies')}
              value={form.watch('hobbies') || ''}
              error={form.formState.errors.hobbies?.message}
              placeholder="e.g., Reading, Traveling, Cooking, Sports..."
              maxLength={500}
              showCharCount
            />
            
            <Textarea
              label="About Me (Optional)"
              rows={6}
              {...form.register('aboutMe')}
              value={form.watch('aboutMe') || ''}
              error={form.formState.errors.aboutMe?.message}
              placeholder="Tell us about yourself, your personality, values, goals..."
              maxLength={1000}
              showCharCount
            />
            
            <Textarea
              label="Partner Preferences (Optional)"
              rows={6}
              {...form.register('partnerPreferences')}
              value={form.watch('partnerPreferences') || ''}
              error={form.formState.errors.partnerPreferences?.message}
              placeholder="Describe your ideal partner (education, occupation, family background, values, etc.)"
              maxLength={1000}
              showCharCount
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-blue-city-text mb-2">
                Upload Photos (Max 5) <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Upload clear photos. First photo will be your profile picture.
              </p>
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
              {uploadedUrls.length === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Please upload at least one photo
                </p>
              )}
            </div>

            {isUploading && (
              <div className="flex items-center justify-center py-8">
                <Spinner />
                <span className="ml-3 text-gray-600">Uploading...</span>
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
        );

      case 6:
        const formData = form.getValues();
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-city-text mb-4">Review Your Profile</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please review all information before submitting. You can go back to edit any section.
              </p>
            </div>

            {/* Personal Info */}
            <Card className="p-6">
              <h4 className="font-bold text-blue-city-text mb-3">Personal Information</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {formData.fullName || 'Not provided'}</p>
                <p><strong>Date of Birth:</strong> {formData.dateOfBirth || 'Not provided'}</p>
                <p><strong>Age:</strong> {formData.age || 'Not calculated'} years</p>
                <p><strong>Gender:</strong> {formData.gender || 'Not provided'}</p>
                <p><strong>Height:</strong> {formData.height || 'Not provided'}</p>
                {formData.weight && <p><strong>Weight:</strong> {formData.weight}</p>}
                <p><strong>Marital Status:</strong> {formData.maritalStatus?.replace('_', ' ') || 'Not provided'}</p>
              </div>
            </Card>

            {/* Contact */}
            <Card className="p-6">
              <h4 className="font-bold text-blue-city-text mb-3">Contact Details</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
                <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
                <p><strong>Address:</strong> {formData.currentAddress || 'Not provided'}</p>
                <p><strong>City:</strong> {formData.city || 'Not provided'}</p>
                <p><strong>State:</strong> {formData.state || 'Not provided'}</p>
              </div>
            </Card>

            {/* Education & Career */}
            <Card className="p-6">
              <h4 className="font-bold text-blue-city-text mb-3">Education & Career</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Education:</strong> {formData.education || 'Not provided'}</p>
                <p><strong>Occupation:</strong> {formData.occupation || 'Not provided'}</p>
                {formData.employerName && <p><strong>Employer:</strong> {formData.employerName}</p>}
                {formData.annualIncome && <p><strong>Annual Income:</strong> {formData.annualIncome}</p>}
              </div>
            </Card>

            {/* Photos */}
            <Card className="p-6">
              <h4 className="font-bold text-blue-city-text mb-3">Photos ({uploadedUrls.length})</h4>
              {uploadedUrls.length > 0 ? (
                <div className="grid grid-cols-5 gap-2">
                  {uploadedUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Photo ${index + 1}`} className="w-full aspect-square object-cover rounded" />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-red-500">No photos uploaded</p>
              )}
            </Card>

            {/* Payment Info */}
            <Card className={`p-6 ${isMember ? 'bg-green-50' : 'bg-blue-50'}`}>
              <h3 className="font-bold text-lg mb-2">
                {isMember ? '✓ Free for Members' : 'Payment Required'}
              </h3>
              <p className="text-sm text-gray-700">
                {isMember
                  ? 'As a lifetime member, creating matrimony profiles is FREE!'
                  : `A one-time payment of ${formatCurrency(MATRIMONY_PRICE)} is required to activate your profile.`}
              </p>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-blue-city-text mb-8">Create Matrimony Profile</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index <= currentStep
                      ? 'bg-blue-city-primary text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-xs text-center mt-2 hidden md:block">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-blue-city-text mb-6">{STEPS[currentStep]}</h2>
          
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || razorpayLoading || uploadedUrls.length === 0}
                >
                  {isSubmitting || razorpayLoading ? (
                    <span className="flex items-center">
                      <Spinner size="sm" color="white" className="mr-2" />
                      {razorpayLoading ? 'Processing Payment...' : 'Submitting...'}
                    </span>
                  ) : (
                    'Submit Profile'
                  )}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

