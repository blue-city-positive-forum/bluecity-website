import api from './api';
import type { GalleryPhoto, GalleryUploadData } from '../types/gallery.types';

export const galleryService = {
  // Get all gallery photos
  getPhotos: async (page: number = 1, limit: number = 20): Promise<{
    photos: GalleryPhoto[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const response = await api.get<{
      photos: GalleryPhoto[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/gallery/photos?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get single photo
  getPhoto: async (id: string): Promise<GalleryPhoto> => {
    const response = await api.get<{ photo: GalleryPhoto }>(`/gallery/photos/${id}`);
    return response.data.photo;
  },

  // Delete photo (Admin only)
  deletePhoto: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/gallery/photos/${id}`);
    return response.data;
  },

  // Bulk delete photos (Admin only)
  bulkDeletePhotos: async (ids: string[]): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/gallery/photos/bulk-delete', { ids });
    return response.data;
  },
};

