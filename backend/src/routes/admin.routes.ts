import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import * as eventController from '../controllers/event.controller';
import * as galleryController from '../controllers/gallery.controller';
import { authenticate, checkAdmin, checkNotSuspended } from '../middleware/auth.middleware';
import { validate, eventSchema, galleryPhotoSchema } from '../middleware/validation.middleware';
import { uploadSingle } from '../middleware/upload.middleware';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, checkNotSuspended, checkAdmin);

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/pending', adminController.getPendingUsers);
router.patch('/users/:id/approve', adminController.approveUser);
router.delete('/users/:id/reject', adminController.rejectUser);
router.post('/users/bulk-approve', adminController.bulkApproveUsers);
router.post('/users/bulk-reject', adminController.bulkRejectUsers);
router.patch('/users/:id/make-admin', adminController.makeAdmin);
router.patch('/users/:id/suspend', adminController.suspendUser);
router.patch('/users/:id/unsuspend', adminController.unsuspendUser);
router.patch('/users/:id/mark-paid', adminController.markUserAsPaid);

// Matrimony Management
router.get('/matrimonies/pending', adminController.getPendingMatrimonies);
router.patch('/matrimonies/:id/approve', adminController.approveMatrimony);
router.patch('/matrimonies/:id/complete', adminController.markMatrimonyCompleted);
router.delete('/matrimonies/:id', adminController.deleteMatrimony);

// Event Management
router.post('/events', validate(eventSchema), eventController.createEvent);
router.patch('/events/:id', validate(eventSchema), eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

// Gallery Management
router.post(
  '/gallery',
  uploadSingle('photo', 5),
  validate(galleryPhotoSchema),
  galleryController.uploadPhoto
);
router.delete('/gallery/:id', galleryController.deletePhoto);

export default router;

