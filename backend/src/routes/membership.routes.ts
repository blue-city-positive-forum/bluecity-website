import { Router } from 'express';
import * as membershipController from '../controllers/membership.controller';
import { authenticate, checkApproved, checkNotSuspended } from '../middleware/auth.middleware';
import { paymentLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

router.use(authenticate, checkNotSuspended, checkApproved);

router.post('/create-order', paymentLimiter, membershipController.createOrder);
router.post('/verify-payment', paymentLimiter, membershipController.verifyPayment);

export default router;

