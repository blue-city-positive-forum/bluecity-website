import multer from 'multer';
import { Request } from 'express';

// Configure storage (memory storage for Cloudinary)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Create multer instance with size limit
export const uploadSingle = (fieldName: string, maxSizeMB: number = 5) => {
  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSizeMB * 1024 * 1024, // Convert MB to bytes
    },
  }).single(fieldName);
};

export const uploadMultiple = (
  fieldName: string,
  maxCount: number = 5,
  maxSizeMB: number = 5
) => {
  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSizeMB * 1024 * 1024,
    },
  }).array(fieldName, maxCount);
};

export const uploadFields = (fields: { name: string; maxCount: number }[]) => {
  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB default
    },
  }).fields(fields);
};

