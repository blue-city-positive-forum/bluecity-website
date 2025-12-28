import api from './api';
import type {
  MatrimonyProfile,
  MatrimonyFormData,
  MatrimonyFilters,
  MatrimonyListResponse,
} from '../types/matrimony.types';
import type { RazorpayOrder, PaymentVerification } from '../types/payment.types';

export const matrimonyService = {
  // Get all matrimony profiles with filters
  getProfiles: async (
    filters: MatrimonyFilters = {},
    page: number = 1,
    limit: number = 12
  ): Promise<MatrimonyListResponse> => {
    const params = new URLSearchParams();
    
    if (filters.gender) params.append('gender', filters.gender);
    if (filters.ageMin) params.append('ageMin', filters.ageMin.toString());
    if (filters.ageMax) params.append('ageMax', filters.ageMax.toString());
    if (filters.heightMin) params.append('heightMin', filters.heightMin.toString());
    if (filters.heightMax) params.append('heightMax', filters.heightMax.toString());
    if (filters.education) params.append('education', filters.education);
    if (filters.occupation) params.append('occupation', filters.occupation);
    if (filters.diet) params.append('diet', filters.diet);
    
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const response = await api.get<any>(
      `/matrimony/profiles?${params.toString()}`
    );
    return response.data.data || response.data;
  },

  // Get my matrimony profiles
  getMyProfiles: async (): Promise<MatrimonyProfile[]> => {
    const response = await api.get<any>('/matrimony/profiles/my');
    return response.data.data?.profiles || response.data.profiles || [];
  },

  // Get single matrimony profile
  getProfile: async (id: string): Promise<MatrimonyProfile> => {
    const response = await api.get<any>(`/matrimony/profiles/${id}`);
    return response.data.data?.profile || response.data.profile;
  },

  // Create matrimony profile
  createProfile: async (data: MatrimonyFormData): Promise<MatrimonyProfile> => {
    const response = await api.post<any>('/matrimony/profiles', data);
    return response.data.data?.profile || response.data.profile;
  },

  // Update matrimony profile
  updateProfile: async (id: string, data: Partial<MatrimonyFormData>): Promise<MatrimonyProfile> => {
    const response = await api.patch<any>(
      `/matrimony/profiles/${id}`,
      data
    );
    return response.data.data?.profile || response.data.profile;
  },

  // Delete matrimony profile
  deleteProfile: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<any>(`/matrimony/profiles/${id}`);
    return {
      message: response.data.message || 'Profile deleted successfully'
    };
  },

  // Toggle profile visibility (hide/unhide)
  toggleVisibility: async (id: string, hide: boolean = true): Promise<MatrimonyProfile> => {
    const endpoint = hide ? 'hide' : 'unhide';
    const response = await api.patch<any>(
      `/matrimony/profiles/my/${id}/${endpoint}`
    );
    return response.data.data?.profile || response.data.profile;
  },

  // Create payment order for matrimony profile
  createPaymentOrder: async (profileId: string): Promise<RazorpayOrder> => {
    const response = await api.post<any>(
      `/matrimony/create-order/${profileId}`
    );
    return response.data.data || response.data;
  },

  // Verify payment for matrimony profile
  verifyPayment: async (
    profileId: string,
    paymentData: PaymentVerification
  ): Promise<{ message: string; profile: MatrimonyProfile }> => {
    const response = await api.post<any>(
      `/matrimony/verify-payment`,
      { ...paymentData, profileId }
    );
    return response.data.data || response.data;
  },
};

