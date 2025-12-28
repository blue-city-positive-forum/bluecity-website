import { Request, Response } from 'express';
import { createMembershipOrder, verifyPaymentSignature } from '../services/razorpay.service';
import { sendMembershipConfirmation } from '../services/mailgun.service';
import User, { IUser } from '../models/User';
import logger from '../utils/logger';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    if (!user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    if (user.isMember) {
      res.status(400).json({ success: false, message: 'Already a member' });
      return;
    }

    const order = await createMembershipOrder();

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
    logger.error('Create membership order error:', error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const isValid = verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
      return;
    }

    // Update user membership status
    const user = await User.findById((req.user as any)?._id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    user.isMember = true;
    user.membershipPayment = {
      amount: parseInt(process.env.MEMBERSHIP_FEE || '700000'),
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paidAt: new Date(),
    };

    await user.save();

    // Send confirmation email
    await sendMembershipConfirmation(
      user.email,
      user.name,
      user.membershipPayment.amount
    );

    logger.info(`Membership payment verified for user: ${user.email}`);

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: { isMember: true },
    });
  } catch (error) {
    logger.error('Verify payment error:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};

