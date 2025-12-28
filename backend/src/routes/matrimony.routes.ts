import { Router } from 'express';
import * as matrimonyController from '../controllers/matrimony.controller';
import {
  authenticate,
  checkApproved,
  checkNotSuspended,
  checkMatrimonyAccess,
} from '../middleware/auth.middleware';
import { validate, matrimonyProfileSchema } from '../middleware/validation.middleware';
import { paymentLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

// All routes require authentication, approval, and not suspended
router.use(authenticate, checkNotSuspended, checkApproved);

// Create and manage own profiles
router.post('/profiles', validate(matrimonyProfileSchema), matrimonyController.createProfile);
router.get('/profiles/my', matrimonyController.getMyProfiles);
router.patch('/profiles/my/:profileId/hide', matrimonyController.hideProfile);
router.patch('/profiles/my/:profileId/unhide', matrimonyController.unhideProfile);

// View matrimony listings (requires access)
router.get('/profiles', checkMatrimonyAccess, matrimonyController.getProfiles);
router.get('/profiles/:id', checkMatrimonyAccess, matrimonyController.getProfileById);

// Update and delete own profiles
router.patch('/profiles/:id', matrimonyController.updateProfile);
router.delete('/profiles/:id', matrimonyController.deleteProfile);

// Payment for matrimony profile (non-paid members)
router.post(
  '/create-order/:profileId',
  paymentLimiter,
  matrimonyController.createMatrimonyPaymentOrder
);
router.post('/verify-payment', paymentLimiter, matrimonyController.verifyMatrimonyPayment);

export default router;

