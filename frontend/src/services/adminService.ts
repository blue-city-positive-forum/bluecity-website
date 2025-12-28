import api from './api';
import type { User } from '../types/auth.types';
import type { MatrimonyProfile } from '../types/matrimony.types';

export const adminService = {
  // User Management
  getPendingUsers: async (): Promise<User[]> => {
    const response = await api.get<{ users: User[] }>('/admin/users/pending');
    return response.data.users;
  },

  approveUser: async (userId: string): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>(`/admin/users/${userId}/approve`);
    return response.data;
  },

  rejectUser: async (userId: string, reason?: string): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>(`/admin/users/${userId}/reject`, {
      reason,
    });
    return response.data;
  },

  bulkApproveUsers: async (userIds: string[]): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/admin/users/bulk-approve', {
      userIds,
    });
    return response.data;
  },

  bulkRejectUsers: async (userIds: string[], reason?: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/admin/users/bulk-reject', {
      userIds,
      reason,
    });
    return response.data;
  },

  makeAdmin: async (userId: string): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>(`/admin/users/${userId}/make-admin`);
    return response.data;
  },

  markAsMember: async (userId: string): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>(`/admin/users/${userId}/mark-member`);
    return response.data;
  },

  suspendUser: async (userId: string, reason: string): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>(`/admin/users/${userId}/suspend`, {
      reason,
    });
    return response.data;
  },

  unsuspendUser: async (userId: string): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>(`/admin/users/${userId}/unsuspend`);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<{ users: User[] }>('/admin/users');
    return response.data.users;
  },

  // Matrimony Management
  getPendingMatrimonies: async (): Promise<MatrimonyProfile[]> => {
    const response = await api.get<{ profiles: MatrimonyProfile[] }>(
      '/admin/matrimony/pending-profiles'
    );
    return response.data.profiles;
  },

  getAllMatrimonies: async (): Promise<MatrimonyProfile[]> => {
    const response = await api.get<{ profiles: MatrimonyProfile[] }>(
      '/admin/matrimony/all-profiles'
    );
    return response.data.profiles;
  },

  markMatrimonyCompleted: async (profileId: string): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>(
      `/admin/matrimony/profiles/${profileId}/complete`
    );
    return response.data;
  },

  deleteMatrimonyProfile: async (profileId: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(
      `/admin/matrimony/profiles/${profileId}`
    );
    return response.data;
  },

  // Stats
  getAdminStats: async (): Promise<{
    totalUsers: number;
    pendingApprovals: number;
    totalMembers: number;
    totalMatrimonyProfiles: number;
    activeMatrimonyProfiles: number;
    totalEvents: number;
    upcomingEvents: number;
    totalGalleryPhotos: number;
  }> => {
    const response = await api.get<{
      stats: {
        totalUsers: number;
        pendingApprovals: number;
        totalMembers: number;
        totalMatrimonyProfiles: number;
        activeMatrimonyProfiles: number;
        totalEvents: number;
        upcomingEvents: number;
        totalGalleryPhotos: number;
      };
    }>('/admin/stats');
    return response.data.stats;
  },
};

