import { Router } from 'express';
import {
  getSignedUploadParams,
  saveGalleryImageMetadata,
  verifyUpload,
} from '../controllers/upload.controller';
import { authenticate, checkAdmin } from '../middleware/auth.middleware';

const router = Router();

/**
 * GET /api/v1/upload/signed-params
 * Get signed upload parameters for direct Cloudinary upload
 * Query params: folder (optional) - 'gallery', 'matrimony', 'events', 'profiles'
 * Note: Accessible to all authenticated users (needed for matrimony profiles)
 */
router.get('/signed-params', authenticate, getSignedUploadParams);

/**
 * POST /api/v1/upload/gallery-metadata
 * Save gallery image metadata after successful Cloudinary upload
 */
router.post('/gallery-metadata', authenticate, checkAdmin, saveGalleryImageMetadata);

/**
 * POST /api/v1/upload/verify
 * Verify that an upload exists in Cloudinary
 */
router.post('/verify', authenticate, verifyUpload);

export default router;


