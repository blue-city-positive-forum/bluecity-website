import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
      return;
    }

    next();
  };
};

// Common validation schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const otpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
});

export const matrimonyProfileSchema = Joi.object({
  fullName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  age: Joi.number().min(18).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  height: Joi.string().required(),
  weight: Joi.string().allow('').optional(),
  maritalStatus: Joi.string().valid('never_married', 'divorced', 'widowed').required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  email: Joi.string().email().required(),
  currentAddress: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  fatherName: Joi.string().allow('').optional(),
  motherName: Joi.string().allow('').optional(),
  siblings: Joi.string().allow('').optional(),
  familyDetails: Joi.string().allow('').optional(),
  education: Joi.string().required(),
  occupation: Joi.string().required(),
  employerName: Joi.string().allow('').optional(),
  annualIncome: Joi.string().allow('').optional(),
  partnerPreferences: Joi.string().allow('').optional(),
  hobbies: Joi.string().allow('').optional(),
  aboutMe: Joi.string().allow('').optional(),
  photos: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      publicId: Joi.string().required(),
      isProfile: Joi.boolean().optional(),
    })
  ).optional(),
});

export const eventSchema = Joi.object({
  title: Joi.string().min(5).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  startTime: Joi.string().optional(),
  endTime: Joi.string().optional(),
  venue: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().optional(),
    googleMapsLink: Joi.string().uri().optional(),
  }).required(),
  organizer: Joi.string().optional(),
  status: Joi.string().valid('upcoming', 'ongoing', 'completed', 'cancelled').optional(),
});

export const galleryPhotoSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  eventId: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

