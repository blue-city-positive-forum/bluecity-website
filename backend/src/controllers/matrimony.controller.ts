import { Request, Response } from 'express';
import MatrimonyProfile from '../models/MatrimonyProfile';
import { createMatrimonyOrder, verifyPaymentSignature } from '../services/razorpay.service';
import { deleteMultipleImages } from '../services/cloudinary.service';
import logger from '../utils/logger';
import { IUser } from '../models/User';

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    const profileData = req.body;
    const userId = user?._id;

    // Check if user is a paid member
    const paymentRequired = !user?.isMember;

    const profile = new MatrimonyProfile({
      ...profileData,
      userId,
      paymentRequired,
      isPaid: !paymentRequired, // Free for paid members
      isApproved: !paymentRequired, // Auto-approve for paid members
    });

    await profile.save();

    logger.info(`New matrimony profile created by user: ${user?.email} (auto-approved: ${!paymentRequired})`);

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: { profile },
    });
  } catch (error) {
    logger.error('Create matrimony profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to create profile' });
  }
};

export const getMyProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const profiles = await MatrimonyProfile.find({ userId: (req.user as any)?._id });

    res.json({
      success: true,
      data: { profiles, count: profiles.length },
    });
  } catch (error) {
    logger.error('Get my profiles error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profiles' });
  }
};

export const getProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gender, minAge, maxAge, maritalStatus, page = 1, limit = 20 } = req.query;

    const filter: any = {
      isApproved: true,
      isCompleted: false,
      isHidden: false,
    };

    if (gender) filter.gender = gender;
    if (minAge) filter.age = { ...filter.age, $gte: parseInt(minAge as string) };
    if (maxAge) filter.age = { ...filter.age, $lte: parseInt(maxAge as string) };
    if (maritalStatus) filter.maritalStatus = maritalStatus;

    const profiles = await MatrimonyProfile.find(filter)
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .sort({ createdAt: -1 });

    const total = await MatrimonyProfile.countDocuments(filter);

    res.json({
      success: true,
      data: {
        profiles,
        pagination: {
          total,
          page: parseInt(page as string),
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    logger.error('Get profiles error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profiles' });
  }
};

export const getProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await MatrimonyProfile.findById(req.params.id).populate(
      'userId',
      'name email'
    );

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    // Increment view count
    profile.viewCount += 1;
    await profile.save();

    res.json({ success: true, data: { profile } });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await MatrimonyProfile.findOne({
      _id: req.params.id,
      userId: (req.user as any)?._id,
    });

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    Object.assign(profile, req.body);
    await profile.save();

    res.json({ success: true, message: 'Profile updated', data: { profile } });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await MatrimonyProfile.findOne({
      _id: req.params.id,
      userId: (req.user as any)?._id,
    });

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

    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    logger.error('Delete profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete profile' });
  }
};

export const hideProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await MatrimonyProfile.findOne({
      _id: req.params.profileId,
      userId: (req.user as any)?._id,
    });

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    profile.isHidden = true;
    await profile.save();

    res.json({ success: true, message: 'Profile hidden successfully', data: { profile } });
  } catch (error) {
    logger.error('Hide profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to hide profile' });
  }
};

export const unhideProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await MatrimonyProfile.findOne({
      _id: req.params.profileId,
      userId: (req.user as any)?._id,
    });

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    profile.isHidden = false;
    await profile.save();

    res.json({ success: true, message: 'Profile is now visible', data: { profile } });
  } catch (error) {
    logger.error('Unhide profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to unhide profile' });
  }
};

export const createMatrimonyPaymentOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { profileId } = req.params;

    const profile = await MatrimonyProfile.findOne({
      _id: profileId,
      userId: (req.user as any)?._id,
    });

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    if (profile.isPaid) {
      res.status(400).json({ success: false, message: 'Profile already paid' });
      return;
    }

    const order = await createMatrimonyOrder(profileId);

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    logger.error('Create matrimony payment order error:', error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

export const verifyMatrimonyPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { profileId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const isValid = verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
      return;
    }

    const profile = await MatrimonyProfile.findOne({
      _id: profileId,
      userId: (req.user as any)?._id,
    });

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    profile.isPaid = true;
    profile.isApproved = true; // Auto-approve after payment
    profile.payment = {
      amount: parseInt(process.env.MATRIMONY_FEE || '40000'),
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paidAt: new Date(),
    };

    await profile.save();

    logger.info(`Matrimony payment verified and profile auto-approved: ${profileId}`);

    res.json({ success: true, message: 'Payment verified successfully' });
  } catch (error) {
    logger.error('Verify matrimony payment error:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};

