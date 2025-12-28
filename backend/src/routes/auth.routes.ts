import { Router } from 'express';
import passport from '../config/passport';
import * as authController from '../controllers/auth.controller';
import { validate, registerSchema, loginSchema, otpSchema } from '../middleware/validation.middleware';
import { authLimiter, otpLimiter } from '../middleware/rateLimiter.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Email/Password registration
router.post('/register', authLimiter, validate(registerSchema), authController.registerWithEmail);
router.post('/verify-otp', authLimiter, validate(otpSchema), authController.verifyOTP);
router.post('/resend-otp', otpLimiter, authController.resendOTP);
router.post('/login', authLimiter, validate(loginSchema), authController.loginWithEmail);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/fail' }),
  authController.googleCallback
);

// Protected routes
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/logout', authenticate, authController.logout);

export default router;

