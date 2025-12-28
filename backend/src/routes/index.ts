import { Router } from 'express';
import authRoutes from './auth.routes';
import membershipRoutes from './membership.routes';
import matrimonyRoutes from './matrimony.routes';
import eventRoutes from './event.routes';
import galleryRoutes from './gallery.routes';
import adminRoutes from './admin.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/membership', membershipRoutes);
router.use('/matrimony', matrimonyRoutes);
router.use('/events', eventRoutes);
router.use('/gallery', galleryRoutes);
router.use('/admin', adminRoutes);
router.use('/upload', uploadRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

export default router;

