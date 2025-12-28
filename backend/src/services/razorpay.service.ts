import Razorpay from 'razorpay';
import crypto from 'crypto';
import logger from '../utils/logger';

let razorpay: Razorpay | null = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  logger.info('Razorpay configured');
} else {
  logger.warn('Razorpay credentials not configured - payment processing disabled');
}

export const createMembershipOrder = async (): Promise<any> => {
  try {
    if (!razorpay) {
      throw new Error('Razorpay not configured');
    }
    
    const amount = parseInt(process.env.MEMBERSHIP_FEE || '700000');
    
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `membership_${Date.now()}`,
    });
    
    logger.info(`Membership order created: ${order.id}`);
    return order;
  } catch (error) {
    logger.error('Error creating membership order:', error);
    throw new Error('Failed to create payment order');
  }
};

export const createMatrimonyOrder = async (profileId: string): Promise<any> => {
  try {
    if (!razorpay) {
      throw new Error('Razorpay not configured');
    }
    
    const amount = parseInt(process.env.MATRIMONY_FEE || '40000');
    
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `matrimony_${profileId}_${Date.now()}`,
    });
    
    logger.info(`Matrimony order created: ${order.id}`);
    return order;
  } catch (error) {
    logger.error('Error creating matrimony order:', error);
    throw new Error('Failed to create payment order');
  }
};

export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      logger.error('Razorpay key secret not configured');
      return false;
    }
    
    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');
    
    return generated_signature === signature;
  } catch (error) {
    logger.error('Error verifying payment signature:', error);
    return false;
  }
};

