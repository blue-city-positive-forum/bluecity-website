export interface Event {
  _id: string;
  title: string;
  date: Date;
  location: string;
  createdBy: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFormData {
  title: string;
  date: string;
  location: string;
}

