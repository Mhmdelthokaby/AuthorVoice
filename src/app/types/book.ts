export interface BookPayload {
  name: string;
  description: string;
  link?: string;
  image?: string;
  imageFile: File | null; // Updated to match service and BookUpload
}

export interface BookUpload {
  name: string;
  description: string;
  link?: string;
  imageFile: File | null;
}

export interface BookUpdate {
  id: number;
  name: string;
  description: string;
  link?: string;
  imageFile: File | null; // Updated to match
}

export interface Book extends BookPayload {
  id: number;
}

export interface UpdateAuthorPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  nationality: string;
  subtitle: string;
  description1: string;
  description2: string;
  experience: string;
  specialization: string;
  skills: string;
  birthday: string; // ISO date string
}
export interface BookForm {
  name: string;
  description: string;
  link?: string;
  imageFile: File | null; // File object, not base64
}