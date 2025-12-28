import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import { IUser } from '../models/User';
import GalleryPhoto from '../models/GalleryPhoto';
import logger from '../utils/logger';

/**
 * Generate signed upload parameters for direct Cloudinary upload
 * This allows frontend to upload directly to Cloudinary without going through our server
 */
export const getSignedUploadParams = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      res.status(503).json({
        success: false,
        message: 'Cloudinary not configured. Please contact administrator.',
      });
      return;
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = (req.query.folder as string) || 'gallery'; // 'gallery', 'matrimony', 'events', 'profiles'
    
    // Folder-based authorization
    const adminOnlyFolders = ['gallery', 'events'];
    if (adminOnlyFolders.includes(folder) && !user.isAdmin) {
      res.status(403).json({
        success: false,
        message: 'Admin access required for this folder',
      });
      return;
    }
    
    // Parameters for Cloudinary upload (free tier compatible)
    const uploadParams: Record<string, any> = {
      timestamp: timestamp,
      folder: `bluecity/${folder}`,
      // Free tier transformations
      transformation: 'c_limit,h_1080,q_auto:good,w_1920',
    };

    // Generate signature using Cloudinary's built-in method
    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET
    );

    logger.info(`Generated signed upload params for folder: ${folder}`);

    res.json({
      success: true,
      data: {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder: `bluecity/${folder}`,
        transformation: 'c_limit,h_1080,q_auto:good,w_1920',
      },
    });
  } catch (error) {
    logger.error('Error generating signed upload params:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate upload parameters',
    });
  }
};

/**
 * Save image metadata after successful Cloudinary upload
 * Validates the upload and stores metadata in MongoDB
 */
export const saveGalleryImageMetadata = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    const {
      publicId,
      secureUrl,
      title,
      description,
      eventId,
      tags,
    } = req.body;

    // Basic validation
    if (!publicId || !secureUrl) {
      res.status(400).json({
        success: false,
        message: 'Missing required upload data',
      });
      return;
    }

    // Verify the upload exists in Cloudinary (security check)
    try {
      await cloudinary.api.resource(publicId);
    } catch (cloudinaryError) {
      logger.error('Invalid Cloudinary public ID:', cloudinaryError);
      res.status(400).json({
        success: false,
        message: 'Invalid upload. Image not found in Cloudinary.',
      });
      return;
    }

    // Save to database
    const photo = new GalleryPhoto({
      title: title || 'Untitled',
      description: description || '',
      imageUrl: secureUrl,
      cloudinaryPublicId: publicId,
      uploadedBy: user._id,
      eventId: eventId || undefined,
      tags: tags || [],
    });

    await photo.save();

    logger.info(`Gallery photo metadata saved: ${publicId} by ${user.email}`);

    res.status(201).json({
      success: true,
      message: 'Image uploaded and saved successfully',
      data: { photo },
    });
  } catch (error) {
    logger.error('Error saving gallery image metadata:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save image metadata',
    });
  }
};

/**
 * Verify an upload exists in Cloudinary (optional endpoint for frontend validation)
 */
export const verifyUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      res.status(400).json({
        success: false,
        message: 'Public ID is required',
      });
      return;
    }

    const result = await cloudinary.api.resource(publicId);

    res.json({
      success: true,
      data: {
        exists: true,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Image not found in Cloudinary',
    });
  }
};


