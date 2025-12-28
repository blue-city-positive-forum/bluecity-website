import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  googleId?: string;
  name: string;
  phone: string;
  profilePhoto?: string;
  
  // Registration & Approval
  isApproved: boolean;
  
  // Membership Status
  isMember: boolean;
  
  // Membership Payment Details
  membershipPayment?: {
    amount: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    paidAt: Date;
  };
  
  // Admin Status
  isAdmin: boolean;
  
  // Suspension
  isSuspended: boolean;
  suspensionReason?: string;
  suspendedAt?: Date;
  
  // Metadata
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false, // Don't return password by default
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    profilePhoto: {
      type: String,
    },
    
    // Registration & Approval
    isApproved: {
      type: Boolean,
      default: false,
    },
    
    // Membership Status
    isMember: {
      type: Boolean,
      default: false,
    },
    
    // Membership Payment Details
    membershipPayment: {
      amount: Number,
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      paidAt: Date,
    },
    
    // Admin Status
    isAdmin: {
      type: Boolean,
      default: false,
    },
    
    // Suspension
    isSuspended: {
      type: Boolean,
      default: false,
    },
    suspensionReason: String,
    suspendedAt: Date,
    
    // Metadata
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes (email and googleId already indexed via unique: true)
UserSchema.index({ isApproved: 1 });
UserSchema.index({ isMember: 1 });
UserSchema.index({ isAdmin: 1 });
UserSchema.index({ isSuspended: 1 });

export default mongoose.model<IUser>('User', UserSchema);

