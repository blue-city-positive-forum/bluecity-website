import { Request, Response } from 'express';
import User from '../models/User';
import MatrimonyProfile from '../models/MatrimonyProfile';
import { sendWelcomeEmail, sendMatrimonyApprovalEmail } from '../services/mailgun.service';
import { deleteMultipleImages } from '../services/cloudinary.service';
import logger from '../utils/logger';

// User Management
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isApproved, isMember, page = 1, limit = 20 } = req.query;

    const filter: any = {};
    if (isApproved !== undefined) filter.isApproved = isApproved === 'true';
    if (isMember !== undefined) filter.isMember = isMember === 'true';

    const users = await User.find(filter)
      .select('-password')
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page: parseInt(page as string),
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    logger.error('Get all users error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

export const getPendingUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({ isApproved: false }).select('-password').sort({ createdAt: -1 });

    res.json({ success: true, data: { users, count: users.length } });
  } catch (error) {
    logger.error('Get pending users error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch pending users' });
  }
};

export const approveUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    user.isApproved = true;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    logger.info(`User approved: ${user.email}`);

    res.json({ success: true, message: 'User approved successfully', data: { user } });
  } catch (error) {
    logger.error('Approve user error:', error);
    res.status(500).json({ success: false, message: 'Failed to approve user' });
  }
};

export const rejectUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    logger.info(`User rejected and deleted: ${user.email}`);

    res.json({ success: true, message: 'User rejected and deleted from database' });
  } catch (error) {
    logger.error('Reject user error:', error);
    res.status(500).json({ success: false, message: 'Failed to reject user' });
  }
};

export const bulkApproveUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { userIds } = _req.body;

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isApproved: true } }
    );

    logger.info(`Bulk approved ${result.modifiedCount} users`);

    res.json({
      success: true,
      message: `${result.modifiedCount} users approved`,
      data: { approved: result.modifiedCount },
    });
  } catch (error) {
    logger.error('Bulk approve users error:', error);
    res.status(500).json({ success: false, message: 'Failed to approve users' });
  }
};

export const bulkRejectUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { userIds } = _req.body;

    const result = await User.deleteMany({ _id: { $in: userIds } });

    logger.info(`Bulk rejected and deleted ${result.deletedCount} users`);

    res.json({
      success: true,
      message: `${result.deletedCount} users rejected and deleted`,
      data: { deleted: result.deletedCount },
    });
  } catch (error) {
    logger.error('Bulk reject users error:', error);
    res.status(500).json({ success: false, message: 'Failed to reject users' });
  }
};

export const makeAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    logger.info(`User made admin: ${user.email}`);

    res.json({ success: true, message: 'User is now an admin', data: { user } });
  } catch (error) {
    logger.error('Make admin error:', error);
    res.status(500).json({ success: false, message: 'Failed to make user admin' });
  }
};

export const suspendUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isSuspended: true,
        suspensionReason: reason,
        suspendedAt: new Date(),
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    logger.info(`User suspended: ${user.email}`);

    res.json({ success: true, message: 'User suspended', data: { user } });
  } catch (error) {
    logger.error('Suspend user error:', error);
    res.status(500).json({ success: false, message: 'Failed to suspend user' });
  }
};

export const unsuspendUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isSuspended: false,
        suspensionReason: null,
        suspendedAt: null,
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    logger.info(`User unsuspended: ${user.email}`);

    res.json({ success: true, message: 'User unsuspended', data: { user } });
  } catch (error) {
    logger.error('Unsuspend user error:', error);
    res.status(500).json({ success: false, message: 'Failed to unsuspend user' });
  }
};

export const markUserAsPaid = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isMember: true },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    logger.info(`User marked as paid member (offline): ${user.email}`);

    res.json({ success: true, message: 'User marked as paid member', data: { user } });
  } catch (error) {
    logger.error('Mark user as paid error:', error);
    res.status(500).json({ success: false, message: 'Failed to mark user as paid' });
  }
};

// Matrimony Management
export const getPendingMatrimonies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const profiles = await MatrimonyProfile.find({ isApproved: false })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: { profiles, count: profiles.length } });
  } catch (error) {
    logger.error('Get pending matrimonies error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch pending profiles' });
  }
};

export const approveMatrimony = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await MatrimonyProfile.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).populate('userId', 'name email');

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    // Send approval email
    const user = profile.userId as any;
    await sendMatrimonyApprovalEmail(user.email, user.name, profile._id.toString());

    logger.info(`Matrimony profile approved: ${profile._id}`);

    res.json({ success: true, message: 'Profile approved', data: { profile } });
  } catch (error) {
    logger.error('Approve matrimony error:', error);
    res.status(500).json({ success: false, message: 'Failed to approve profile' });
  }
};

export const markMatrimonyCompleted = async (req: Request, res: Response): Promise<void> => {
  try {
    const graceDays = parseInt(process.env.MATRIMONY_DELETION_GRACE_DAYS || '14');
    const scheduledDeletion = new Date();
    scheduledDeletion.setDate(scheduledDeletion.getDate() + graceDays);

    const profile = await MatrimonyProfile.findByIdAndUpdate(
      req.params.id,
      {
        isCompleted: true,
        completedDate: new Date(),
        scheduledDeletion,
      },
      { new: true }
    );

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    logger.info(`Matrimony marked completed, scheduled for deletion: ${profile._id}`);

    res.json({
      success: true,
      message: `Profile marked completed and will be deleted after ${graceDays} days`,
      data: { profile },
    });
  } catch (error) {
    logger.error('Mark matrimony completed error:', error);
    res.status(500).json({ success: false, message: 'Failed to mark profile as completed' });
  }
};

export const deleteMatrimony = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await MatrimonyProfile.findById(req.params.id);

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    // Delete photos from Cloudinary
    const publicIds = profile.photos.map((photo) => photo.publicId);
    if (publicIds.length > 0) {
      await deleteMultipleImages(publicIds);
    }

    await profile.deleteOne();

    logger.info(`Matrimony profile deleted by admin: ${profile._id}`);

    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    logger.error('Delete matrimony error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete profile' });
  }
};

