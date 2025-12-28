import cloudinary from '../config/cloudinary';
import logger from '../utils/logger';

export const uploadImage = async (
  file: Express.Multer.File,
  folder: string = 'bluecity'
): Promise<{ url: string; publicId: string }> => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      resource_type: 'auto',
    });
    
    logger.info(`Image uploaded to Cloudinary: ${result.public_id}`);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    logger.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export const uploadImageBuffer = async (
  buffer: Buffer,
  folder: string = 'bluecity'
): Promise<{ url: string; publicId: string }> => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Upload failed'));
          } else {
            logger.info(`Image uploaded to Cloudinary: ${result.public_id}`);
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    logger.error('Error uploading image buffer to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    logger.info(`Image deleted from Cloudinary: ${publicId}`);
  } catch (error) {
    logger.error('Error deleting image from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
};

export const deleteMultipleImages = async (publicIds: string[]): Promise<void> => {
  try {
    await cloudinary.api.delete_resources(publicIds);
    logger.info(`Multiple images deleted from Cloudinary: ${publicIds.length} images`);
  } catch (error) {
    logger.error('Error deleting multiple images from Cloudinary:', error);
    throw new Error('Failed to delete images');
  }
};

