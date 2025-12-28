import mongoose, { Schema, Document } from 'mongoose';

export interface IMatrimonyProfile extends Document {
  userId: mongoose.Types.ObjectId;
  
  // Payment Status
  paymentRequired: boolean;
  isPaid: boolean;
  payment?: {
    amount: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    paidAt: Date;
  };
  
  // Approval Status
  isApproved: boolean;
  
  // Completion Status
  isCompleted: boolean;
  completedDate?: Date;
  scheduledDeletion?: Date;
  
  // Visibility
  isHidden: boolean;
  
  // Personal Information
  fullName: string;
  dateOfBirth: Date;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: string;
  weight?: string;
  maritalStatus: 'never_married' | 'divorced' | 'widowed';
  
  // Contact
  phone: string;
  email: string;
  currentAddress: string;
  city: string;
  state: string;
  
  // Family
  fatherName?: string;
  motherName?: string;
  siblings?: string;
  familyDetails?: string;
  
  // Education & Career
  education: string;
  occupation: string;
  employerName?: string;
  annualIncome?: string;
  
  // Preferences
  partnerPreferences?: string;
  hobbies?: string;
  
  // Photos
  photos: {
    url: string;
    publicId: string;
    isProfile: boolean;
    uploadDate: Date;
  }[];
  
  // Bio
  aboutMe?: string;
  
  // Metadata
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const MatrimonyProfileSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // Payment Status
    paymentRequired: {
      type: Boolean,
      default: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    payment: {
      amount: Number,
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      paidAt: Date,
    },
    
    // Approval Status
    isApproved: {
      type: Boolean,
      default: false,
    },
    
    // Completion Status
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedDate: Date,
    scheduledDeletion: Date,
    
    // Visibility
    isHidden: {
      type: Boolean,
      default: false,
    },
    
    // Personal Information
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: String,
    maritalStatus: {
      type: String,
      enum: ['never_married', 'divorced', 'widowed'],
      required: true,
    },
    
    // Contact
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    currentAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    
    // Family
    fatherName: String,
    motherName: String,
    siblings: String,
    familyDetails: String,
    
    // Education & Career
    education: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    employerName: String,
    annualIncome: String,
    
    // Preferences
    partnerPreferences: String,
    hobbies: String,
    
    // Photos
    photos: [
      {
        url: String,
        publicId: String,
        isProfile: Boolean,
        uploadDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    
    // Bio
    aboutMe: String,
    
    // Metadata
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
MatrimonyProfileSchema.index({ userId: 1 });
MatrimonyProfileSchema.index({ isApproved: 1 });
MatrimonyProfileSchema.index({ isCompleted: 1 });
MatrimonyProfileSchema.index({ gender: 1 });
MatrimonyProfileSchema.index({ age: 1 });
MatrimonyProfileSchema.index({ maritalStatus: 1 });
MatrimonyProfileSchema.index({ isApproved: 1, isCompleted: 1, isHidden: 1 });
MatrimonyProfileSchema.index({ scheduledDeletion: 1 });

export default mongoose.model<IMatrimonyProfile>('MatrimonyProfile', MatrimonyProfileSchema);

