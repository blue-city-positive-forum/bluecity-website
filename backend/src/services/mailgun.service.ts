import formData from 'form-data';
import Mailgun from 'mailgun.js';
import logger from '../utils/logger';

const mailgun = new Mailgun(formData);

let mg: any = null;
const DOMAIN = process.env.MAILGUN_DOMAIN || '';
const FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL || 'noreply@example.com';

if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
  mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
  });
  logger.info('Mailgun configured');
} else {
  logger.warn('Mailgun credentials not configured - email sending disabled');
}

export const sendOTPEmail = async (email: string, name: string, otp: string): Promise<void> => {
  try {
    if (!mg) {
      logger.warn(`Email sending disabled - OTP for ${email}: ${otp}`);
      return;
    }
    
    await mg.messages.create(DOMAIN, {
      from: `Jodhpur Community <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Verify Your Email - Jodhpur Community',
      html: `
        <h2>Email Verification</h2>
        <p>Dear ${name},</p>
        <p>Thank you for registering with Jodhpur Community Ahmedabad!</p>
        <p>Your verification code is: <strong style="font-size: 24px; color: #4F46E5;">${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <br>
        <p>Regards,<br>Jodhpur Community Team</p>
      `,
    });
    
    logger.info(`OTP email sent to ${email}`);
  } catch (error) {
    logger.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  try {
    if (!mg) {
      logger.warn(`Email sending disabled - Welcome email not sent to ${email}`);
      return;
    }
    
    await mg.messages.create(DOMAIN, {
      from: `Jodhpur Community <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Welcome to Jodhpur Community Ahmedabad!',
      html: `
        <h2>Welcome to Jodhpur Community!</h2>
        <p>Dear ${name},</p>
        <p>Your account has been approved! You can now log in and explore our community platform.</p>
        <h3>Next steps:</h3>
        <ul>
          <li>Become a paid member to unlock all features (₹7,000 lifetime membership)</li>
          <li>Connect with fellow community members</li>
          <li>Stay updated on upcoming events</li>
          <li>Create matrimony profiles</li>
        </ul>
        <p><a href="${process.env.FRONTEND_URL}/login">Login Now</a></p>
        <br>
        <p>Regards,<br>Jodhpur Community Team</p>
      `,
    });
    
    logger.info(`Welcome email sent to ${email}`);
  } catch (error) {
    logger.error('Error sending welcome email:', error);
  }
};

export const sendMembershipConfirmation = async (
  email: string,
  name: string,
  amount: number
): Promise<void> => {
  try {
    if (!mg) {
      logger.warn(`Email sending disabled - Membership confirmation not sent to ${email}`);
      return;
    }
    
    await mg.messages.create(DOMAIN, {
      from: `Jodhpur Community <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Membership Payment Confirmed',
      html: `
        <h2>Payment Successful!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for becoming a lifetime member of Jodhpur Community Ahmedabad!</p>
        <p><strong>Payment Details:</strong></p>
        <ul>
          <li>Amount: ₹${amount / 100}</li>
          <li>Membership Type: Lifetime</li>
        </ul>
        <p>You now have access to all premium features including:</p>
        <ul>
          <li>Free matrimony profile creation (unlimited)</li>
          <li>Access to all matrimony profiles</li>
          <li>Priority support</li>
        </ul>
        <p><a href="${process.env.FRONTEND_URL}/account">Go to My Account</a></p>
        <br>
        <p>Regards,<br>Jodhpur Community Team</p>
      `,
    });
    
    logger.info(`Membership confirmation email sent to ${email}`);
  } catch (error) {
    logger.error('Error sending membership confirmation email:', error);
  }
};

export const sendMatrimonyApprovalEmail = async (
  email: string,
  name: string,
  profileId: string
): Promise<void> => {
  try {
    if (!mg) {
      logger.warn(`Email sending disabled - Matrimony approval email not sent to ${email}`);
      return;
    }
    
    await mg.messages.create(DOMAIN, {
      from: `Jodhpur Community <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Your Matrimony Profile is Now Live!',
      html: `
        <h2>Profile Approved!</h2>
        <p>Dear ${name},</p>
        <p>Good news! Your matrimony profile has been approved and is now visible to other members.</p>
        <p><a href="${process.env.FRONTEND_URL}/matrimony/profile/${profileId}">View Your Profile</a></p>
        <h3>Tips:</h3>
        <ul>
          <li>Keep your profile updated</li>
          <li>Add multiple photos for better visibility</li>
          <li>Respond promptly to interested members</li>
        </ul>
        <p>Best wishes in your search!</p>
        <br>
        <p>Regards,<br>Jodhpur Community Team</p>
      `,
    });
    
    logger.info(`Matrimony approval email sent to ${email}`);
  } catch (error) {
    logger.error('Error sending matrimony approval email:', error);
  }
};

export const sendAdminNotification = async (
  subject: string,
  message: string
): Promise<void> => {
  try {
    if (!mg) {
      logger.warn(`Email sending disabled - Admin notification not sent: ${subject}`);
      return;
    }
    
    // In production, fetch all admin emails from database
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    await mg.messages.create(DOMAIN, {
      from: `Jodhpur Community <${FROM_EMAIL}>`,
      to: [adminEmail],
      subject: `[Admin] ${subject}`,
      html: message,
    });
    
    logger.info(`Admin notification sent: ${subject}`);
  } catch (error) {
    logger.error('Error sending admin notification:', error);
  }
};

