import api from './api';
import { CLOUDINARY_CLOUD_NAME } from '../utils/constants';

interface SignedUploadParams {
  timestamp: number;
  signature: string;
  folder: string;
  apiKey: string;
  cloudName: string;
  transformation?: string;
}

interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export const uploadService = {
  // Get signed upload params from backend
  getSignedUploadParams: async (folder: string = 'matrimony'): Promise<SignedUploadParams> => {
    const response = await api.get<{ success: boolean; data: SignedUploadParams }>(
      `/upload/signed-params?folder=${folder}`
    );
    return response.data.data;
  },

  // Upload image directly to Cloudinary
  uploadToCloudinary: async (
    file: File,
    folder: string = 'matrimony',
    onProgress?: (progress: number) => void
  ): Promise<CloudinaryUploadResponse> => {
    // Get signed params from backend
    const params = await uploadService.getSignedUploadParams(folder);
    console.log('Upload params received:', { ...params, signature: params.signature.substring(0, 10) + '...' });

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', params.timestamp.toString());
    formData.append('signature', params.signature);
    formData.append('folder', params.folder);
    formData.append('api_key', params.apiKey);
    
    // Include transformation if provided (required for signature validation)
    if (params.transformation) {
      formData.append('transformation', params.transformation);
    }

    // Upload to Cloudinary
    const uploadUrl = `https://api.cloudinary.com/v1_1/${params.cloudName}/image/upload`;
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      console.error('Cloudinary upload error:', errorData);
      throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
    }

    const result: CloudinaryUploadResponse = await response.json();
    return result;
  },

  // Save gallery image metadata to backend
  saveGalleryMetadata: async (data: {
    title: string;
    imageUrl: string;
    publicId: string;
  }): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(
      '/upload/gallery-metadata',
      data
    );
    return response.data;
  },

  // Upload multiple images
  uploadMultiple: async (
    files: File[],
    folder: string = 'matrimony',
    onProgress?: (fileIndex: number, progress: number) => void
  ): Promise<CloudinaryUploadResponse[]> => {
    const results: CloudinaryUploadResponse[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const result = await uploadService.uploadToCloudinary(
        files[i],
        folder,
        onProgress ? (progress) => onProgress(i, progress) : undefined
      );
      results.push(result);
    }
    
    return results;
  },
};

