import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  
  // Date & Time
  startDate: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  
  // Location
  venue: {
    name: string;
    address: string;
    city?: string;
    googleMapsLink?: string;
  };
  
  // Event Details
  images: string[];
  organizer?: string;
  
  // Status
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isPublished: boolean;
  
  // Metadata
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    // Date & Time
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    startTime: String,
    endTime: String,
    
    // Location
    venue: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: String,
      googleMapsLink: String,
    },
    
    // Event Details
    images: [String],
    organizer: String,
    
    // Status
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    
    // Metadata
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
EventSchema.index({ startDate: -1 });
EventSchema.index({ status: 1 });
EventSchema.index({ isPublished: 1 });

export default mongoose.model<IEvent>('Event', EventSchema);

