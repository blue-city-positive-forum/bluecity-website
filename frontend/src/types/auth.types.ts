export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}

export interface User {
  _id?: string;
  id?: string; // Backend uses 'id' instead of '_id' in responses
  name: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  googleId?: string;
  registrationType?: 'email' | 'google';
  isEmailVerified?: boolean;
  isApproved: boolean;
  isMember: boolean;
  isAdmin: boolean;
  isSuspended?: boolean;
  suspensionReason?: string;
  suspendedAt?: Date;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

