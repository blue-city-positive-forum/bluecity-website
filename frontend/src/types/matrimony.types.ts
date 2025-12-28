export interface MatrimonyProfile {
  _id: string;
  userId: string;
  name: string;
  dateOfBirth: Date;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  complexion: string;
  fatherName: string;
  motherName: string;
  siblings: number;
  familyType: 'nuclear' | 'joint';
  education: string;
  occupation: string;
  annualIncome: string;
  diet: 'vegetarian' | 'non-vegetarian' | 'eggetarian';
  smoking: boolean;
  drinking: boolean;
  hobbies: string[];
  partnerAgeMin: number;
  partnerAgeMax: number;
  partnerHeightMin: number;
  partnerHeightMax: number;
  partnerEducation: string;
  partnerLocation: string;
  photos: string[];
  contactEmail: string;
  contactPhone: string;
  paymentRequired: boolean;
  isPaid: boolean;
  payment?: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    amount: number;
    paidAt: Date;
  };
  isHidden: boolean;
  scheduledDeletion?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Match backend schema exactly (from MatrimonyProfile model)
export interface MatrimonyFormData {
  // Personal Information (Required)
  fullName: string;
  dateOfBirth: string;
  age?: number; // Calculated from DOB
  gender: 'male' | 'female' | 'other';
  height: string;
  weight?: string;
  maritalStatus: 'never_married' | 'divorced' | 'widowed';
  
  // Contact (Required)
  phone: string;
  email: string;
  currentAddress: string;
  city: string;
  state: string;
  
  // Family (Optional)
  fatherName?: string;
  motherName?: string;
  siblings?: string;
  familyDetails?: string;
  
  // Education & Career (Required)
  education: string;
  occupation: string;
  employerName?: string;
  annualIncome?: string;
  
  // Preferences & Bio (Optional)
  partnerPreferences?: string;
  hobbies?: string;
  aboutMe?: string;
  
  // Photos
  photos?: Array<{
    url: string;
    publicId: string;
    isProfile: boolean;
  }>;
}

// Alias for form input (same as MatrimonyFormData)
export type MatrimonyProfileInput = MatrimonyFormData;

export interface MatrimonyFilters {
  gender?: 'male' | 'female' | 'other';
  ageMin?: number;
  ageMax?: number;
  heightMin?: number;
  heightMax?: number;
  education?: string;
  occupation?: string;
  diet?: 'vegetarian' | 'non-vegetarian' | 'eggetarian';
}

export interface MatrimonyListResponse {
  profiles: MatrimonyProfile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

