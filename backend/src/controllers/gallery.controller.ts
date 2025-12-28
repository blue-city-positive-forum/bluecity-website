import { Request, Response } from 'express';
import GalleryPhoto from '../models/GalleryPhoto';
import { uploadImageBuffer, deleteImage } from '../services/cloudinary.service';
import logger from '../utils/logger';

export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const { title, description, eventId, tags } = req.body;

    // Upload to Cloudinary
    const { url, publicId } = await uploadImageBuffer(req.file.buffer, 'gallery');

    const photo = new GalleryPhoto({
      title,
      description,
      imageUrl: url,
      cloudinaryPublicId: publicId,
      eventId: eventId || undefined,
      tags: tags ? JSON.parse(tags) : [],
      uploadedBy: (req.user as any)?._id,
    });

    await photo.save();

    logger.info(`New photo uploaded to gallery by: ${(req.user as any)?.email}`);

    res.status(201).json({
      success: true,
      message: 'Photo uploaded successfully',
      data: { photo },
    });
  } catch (error) {
    logger.error('Upload photo error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload photo' });
  }
};

export const getPhotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, page = 1, limit = 20 } = req.query;

    const filter: any = { isVisible: true };
    if (eventId) filter.eventId = eventId;

    const photos = await GalleryPhoto.find(filter)
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .sort({ uploadDate: -1 });

    const total = await GalleryPhoto.countDocuments(filter);

    res.json({
      success: true,
      data: {
        photos,
        pagination: {
          total,
          page: parseInt(page as string),
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    logger.error('Get photos error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch photos' });
  }
};

export const getPhotoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const photo = await GalleryPhoto.findById(req.params.id)
      .populate('uploadedBy', 'name')
      .populate('eventId', 'title');

    if (!photo) {
      res.status(404).json({ success: false, message: 'Photo not found' });
      return;
    }

    // Increment view count
    photo.viewCount += 1;
    await photo.save();

    res.json({ success: true, data: { photo } });
  } catch (error) {
    logger.error('Get photo error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch photo' });
  }
};

export const deletePhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const photo = await GalleryPhoto.findById(req.params.id);

    if (!photo) {
      res.status(404).json({ success: false, message: 'Photo not found' });
      return;
    }

    // Delete from Cloudinary
    await deleteImage(photo.cloudinaryPublicId);

    await photo.deleteOne();

    res.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error) {
    logger.error('Delete photo error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete photo' });
  }
};

