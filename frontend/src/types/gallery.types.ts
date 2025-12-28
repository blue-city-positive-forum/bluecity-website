export interface GalleryPhoto {
  _id: string;
  title: string;
  imageUrl: string;
  publicId: string;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryUploadData {
  title: string;
  imageUrl: string;
  publicId: string;
}

