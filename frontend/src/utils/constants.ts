export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api/v1';
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  ABOUT_WHO_WE_ARE: '/about/who-we-are',
  ABOUT_MANAGEMENT_TEAM: '/about/management-team',
  ABOUT_VISION: '/about/vision',
  ABOUT_MISSION: '/about/mission',
  ABOUT_OBJECTIVES: '/about/objectives',
  HELP_MEDICAL: '/help/medical',
  HELP_EDUCATION: '/help/education',
  HELP_GENERAL: '/help/general',
  ACTIVITIES_SOCIAL_WORK: '/activities/social-work',
  ACTIVITIES_CULTURAL: '/activities/cultural',
  ACTIVITIES_GET_TOGETHER: '/activities/get-together',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  EVENTS: '/events',
  LOGIN: '/login',
  LOGIN_SUCCESS: '/login/success',
  LOGIN_FAIL: '/login/fail',
  RESET_PASSWORD: '/reset-password',
  ACCOUNT: '/account',
  JOIN_US: '/joinus',
  MATRIMONY: '/matrimony',
  MATRIMONY_CREATE: '/matrimony/create',
  MATRIMONY_EDIT: '/matrimony/edit/:id',
  MATRIMONY_PROFILE: '/matrimony/profile/:id',
  MATRIMONY_LIST: '/matrimony/list',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_MATRIMONIES: '/admin/matrimonies',
} as const;

export const MEMBERSHIP_PRICE = 7000; // ₹7000
export const MATRIMONY_PRICE = 400; // ₹400

export const COMPLEXIONS = [
  'Fair',
  'Wheatish',
  'Dusky',
  'Dark',
];

export const FAMILY_TYPES = [
  { value: 'nuclear', label: 'Nuclear' },
  { value: 'joint', label: 'Joint' },
];

export const DIET_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'non-vegetarian', label: 'Non-Vegetarian' },
  { value: 'eggetarian', label: 'Eggetarian' },
];

export const EDUCATION_OPTIONS = [
  'High School',
  'Diploma',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Professional Degree',
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const INCOME_RANGES = [
  'Below 3 Lakhs',
  '3-5 Lakhs',
  '5-7 Lakhs',
  '7-10 Lakhs',
  '10-15 Lakhs',
  '15-20 Lakhs',
  '20-30 Lakhs',
  'Above 30 Lakhs',
];

