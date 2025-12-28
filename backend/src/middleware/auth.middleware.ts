import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt';
import User, { IUser } from '../models/User';
import logger from '../utils/logger';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const decoded: JWTPayload = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export const checkApproved = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as IUser;
  if (!user?.isApproved) {
    res.status(403).json({
      success: false,
      message: 'Account not approved. Please wait for admin approval.',
    });
    return;
  }
  next();
};

export const checkNotSuspended = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as IUser;
  if (user?.isSuspended) {
    res.status(403).json({
      success: false,
      message: `Account suspended. Reason: ${user.suspensionReason || 'Not specified'}`,
    });
    return;
  }
  next();
};

export const checkMember = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as IUser;
  if (!user?.isMember) {
    res.status(403).json({
      success: false,
      message: 'Paid membership required',
    });
    return;
  }
  next();
};

export const checkAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as IUser;
  if (!user?.isAdmin) {
    res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
    return;
  }
  next();
};

export const checkMatrimonyAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as IUser;
    // Paid members have full access
    if (user?.isMember) {
      next();
      return;
    }

    // Non-paid members need to have at least one paid matrimony profile
    const MatrimonyProfile = (await import('../models/MatrimonyProfile')).default;
    const paidProfile = await MatrimonyProfile.findOne({
      userId: user?._id,
      isPaid: true,
    });

    if (paidProfile) {
      next();
      return;
    }

    res.status(403).json({
      success: false,
      message: 'Access denied. Become a paid member or pay for a matrimony profile to view listings.',
    });
  } catch (error) {
    logger.error('Error checking matrimony access:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking access permissions',
    });
  }
};

