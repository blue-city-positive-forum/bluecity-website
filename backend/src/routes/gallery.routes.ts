import { Router } from 'express';
import * as galleryController from '../controllers/gallery.controller';

const router = Router();

// Public routes (no authentication required)
router.get('/', galleryController.getPhotos);
router.get('/:id', galleryController.getPhotoById);

export default router;

