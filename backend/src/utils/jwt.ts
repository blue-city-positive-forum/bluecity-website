import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface JWTPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
}

export const generateToken = (user: IUser): string => {
  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const secret = process.env.JWT_SECRET || 'default_secret_key';
  const expiresIn: string | number = process.env.JWT_EXPIRES_IN || '7d';
  
  const options: SignOptions = {
    expiresIn: expiresIn as any,
  };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_SECRET || 'default_secret_key';
  return jwt.verify(token, secret) as JWTPayload;
};

