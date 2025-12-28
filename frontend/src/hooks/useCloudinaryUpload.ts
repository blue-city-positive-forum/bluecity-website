import { useState } from 'react';
import { uploadService } from '../services/uploadService';
import { useUIStore } from '../store/uiStore';
import { isImageFile, validateImageSize } from '../utils/helpers';

interface UseCloudinaryUploadOptions {
  maxFiles?: number;
  folder?: string;
}

interface UploadedImage {
  url: string;
  publicId: string;
}

export const useCloudinaryUpload = (options: UseCloudinaryUploadOptions = {}) => {
  const { maxFiles = 5, folder = 'matrimony' } = options;
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const showAlert = useUIStore((state) => state.showAlert);

  const uploadSingle = async (file: File): Promise<string | null> => {
    // Validate file
    if (!isImageFile(file)) {
      showAlert('Please select an image file', 'error');
      return null;
    }

    if (!validateImageSize(file, 5)) {
      showAlert('Image size should not exceed 5MB', 'error');
      return null;
    }

    setUploading(true);
    setProgress(0);

    try {
      const result = await uploadService.uploadToCloudinary(file, folder);
      setProgress(100);
      showAlert('Image uploaded successfully', 'success');
      return result.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      showAlert('Failed to upload image', 'error');
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const uploadImages = async (files: File[]): Promise<void> => {
    // Check max files limit
    if (uploadedImages.length + files.length > maxFiles) {
      showAlert(`You can only upload up to ${maxFiles} images`, 'error');
      return;
    }

    // Validate all files
    for (const file of files) {
      if (!isImageFile(file)) {
        showAlert('All files must be images', 'error');
        return;
      }
      if (!validateImageSize(file, 5)) {
        showAlert(`${file.name} exceeds 5MB limit`, 'error');
        return;
      }
    }

    setUploading(true);
    const newImages: UploadedImage[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(Math.round(((i + 1) / files.length) * 100));
        
        const result = await uploadService.uploadToCloudinary(file, folder);
        newImages.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }

      // Use functional update to get current state
      setUploadedImages((prev) => [...prev, ...newImages]);
      showAlert(`Successfully uploaded ${newImages.length} image(s)`, 'success');
    } catch (error) {
      console.error('Upload error:', error);
      showAlert('Failed to upload some images', 'error');
      // Still add successfully uploaded images
      if (newImages.length > 0) {
        // Use functional update to get current state
        setUploadedImages((prev) => [...prev, ...newImages]);
      }
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const removeImage = (index: number): void => {
    // Use functional update to get current state
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    showAlert('Image removed', 'info');
  };

  const clearImages = (): void => {
    setUploadedImages([]);
  };

  const setImages = (images: UploadedImage[]): void => {
    setUploadedImages(images);
  };

  return {
    uploadSingle,
    uploadImages,
    uploadedImages,
    uploadedUrls: uploadedImages.map(img => img.url),  // For backward compatibility
    setUploadedImages: setImages,  // For pre-filling when editing
    isUploading: uploading,
    uploading,
    progress,
    removeImage,
    clearImages,
  };
};

