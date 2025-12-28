import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryPhoto extends Document {
  title?: string;
  description?: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  
  // Association
  eventId?: mongoose.Types.ObjectId;
  
  // Organization
  tags: string[];
  
  // Metadata
  uploadedBy: mongoose.Types.ObjectId;
  uploadDate: Date;
  isVisible: boolean;
  viewCount: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const GalleryPhotoSchema: Schema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    
    // Association
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    
    // Organization
    tags: [String],
    
    // Metadata
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
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
GalleryPhotoSchema.index({ eventId: 1 });
GalleryPhotoSchema.index({ isVisible: 1 });
GalleryPhotoSchema.index({ uploadDate: -1 });

export default mongoose.model<IGalleryPhoto>('GalleryPhoto', GalleryPhotoSchema);

