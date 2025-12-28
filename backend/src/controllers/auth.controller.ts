import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';
import PasswordReset from '../models/PasswordReset';
import { generateToken } from '../utils/jwt';
import { generateOTP, getOTPExpiry } from '../utils/otp';
import { sendOTPEmail } from '../services/mailgun.service';
import logger from '../utils/logger';

export const registerWithEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (not approved by default)
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      isApproved: false,
    });

    await user.save();

    // Generate and send OTP
    const otp = generateOTP();
    const passwordReset = new PasswordReset({
      email,
      otp,
      expiresAt: getOTPExpiry(),
    });
    await passwordReset.save();

    await sendOTPEmail(email, name, otp);

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email with the OTP sent.',
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
    });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    const reset = await PasswordReset.findOne({
      email,
      otp,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!reset) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
      return;
    }

    // Mark OTP as used
    reset.isUsed = true;
    await reset.save();

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          profilePhoto: user.profilePhoto,
          isApproved: user.isApproved,
          isMember: user.isMember,
          isAdmin: user.isAdmin,
          isSuspended: user.isSuspended,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    logger.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification failed',
    });
  }
};

export const resendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Generate new OTP
    const otp = generateOTP();
    const passwordReset = new PasswordReset({
      email,
      otp,
      expiresAt: getOTPExpiry(),
    });
    await passwordReset.save();

    await sendOTPEmail(email, user.name, otp);

    res.json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    logger.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP',
    });
  }
};

export const loginWithEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    if (user.isSuspended) {
      res.status(403).json({
        success: false,
        message: `Account suspended. Reason: ${user.suspensionReason || 'Not specified'}`,
      });
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          profilePhoto: user.profilePhoto,
          isApproved: user.isApproved,
          isMember: user.isMember,
          isAdmin: user.isAdmin,
          isSuspended: user.isSuspended,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
};

export const googleCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.redirect(`${process.env.FRONTEND_URL}/login/fail`);
      return;
    }

    const user = req.user as any;
    const token = generateToken(user);

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/login/success?token=${token}`);
  } catch (error) {
    logger.error('Google callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login/fail`);
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          profilePhoto: user.profilePhoto,
          isApproved: user.isApproved,
          isMember: user.isMember,
          isAdmin: user.isAdmin,
          isSuspended: user.isSuspended,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    logger.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user data',
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    req.logout((err) => {
      if (err) {
        logger.error('Logout error:', err);
      }
    });

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }
};

