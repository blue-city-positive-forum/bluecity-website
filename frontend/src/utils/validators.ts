import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
});

export const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Matrimony validation schemas
export const matrimonyBasicSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  height: z.number().min(100, 'Height must be at least 100 cm').max(250, 'Height cannot exceed 250 cm'),
  complexion: z.string().min(1, 'Complexion is required'),
});

export const matrimonyFamilySchema = z.object({
  fatherName: z.string().min(2, 'Father\'s name is required'),
  motherName: z.string().min(2, 'Mother\'s name is required'),
  siblings: z.number().min(0, 'Siblings cannot be negative'),
  familyType: z.enum(['nuclear', 'joint']),
});

export const matrimonyEducationSchema = z.object({
  education: z.string().min(1, 'Education is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  annualIncome: z.string().min(1, 'Annual income is required'),
});

export const matrimonyLifestyleSchema = z.object({
  diet: z.enum(['vegetarian', 'non-vegetarian', 'eggetarian']),
  smoking: z.boolean(),
  drinking: z.boolean(),
  hobbies: z.array(z.string()).min(1, 'At least one hobby is required'),
});

export const matrimonyPreferencesSchema = z.object({
  partnerAgeMin: z.number().min(18, 'Minimum age must be at least 18'),
  partnerAgeMax: z.number().max(100, 'Maximum age cannot exceed 100'),
  partnerHeightMin: z.number().min(100, 'Minimum height must be at least 100 cm'),
  partnerHeightMax: z.number().max(250, 'Maximum height cannot exceed 250 cm'),
  partnerEducation: z.string().min(1, 'Partner education preference is required'),
  partnerLocation: z.string().min(1, 'Partner location preference is required'),
}).refine((data) => data.partnerAgeMin <= data.partnerAgeMax, {
  message: 'Minimum age cannot be greater than maximum age',
  path: ['partnerAgeMax'],
}).refine((data) => data.partnerHeightMin <= data.partnerHeightMax, {
  message: 'Minimum height cannot be greater than maximum height',
  path: ['partnerHeightMax'],
});

export const matrimonyContactSchema = z.object({
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
});

// Complete matrimony profile schema (matches backend exactly)
export const matrimonyProfileSchema = z.object({
  // Personal Information (Required)
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  age: z.number().optional(),
  gender: z.enum(['male', 'female', 'other']),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().optional(),
  maritalStatus: z.enum(['never_married', 'divorced', 'widowed']),
  
  // Contact (Required)
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email address'),
  currentAddress: z.string().min(5, 'Current address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  
  // Family (Optional)
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  siblings: z.string().optional(),
  familyDetails: z.string().optional(),
  
  // Education & Career (Required)
  education: z.string().min(1, 'Education is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  employerName: z.string().optional(),
  annualIncome: z.string().optional(),
  
  // Preferences & Bio (Optional)
  partnerPreferences: z.string().optional(),
  hobbies: z.string().optional(),
  aboutMe: z.string().optional(),
  
  // Photos
  photos: z.array(z.object({
    url: z.string(),
    publicId: z.string(),
    isProfile: z.boolean(),
  })).optional(),
}).partial(); // Make all fields optional for multi-step form

// Event validation schemas
export const eventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
});

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

