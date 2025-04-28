export type UserRole = 'admin' | 'author' | 'publishing-house';

export interface UserProfile {
  id?: string;
  email?: string;
  role?: UserRole;
  name?: string;
  phone?: string;
  address?: string;
  age?: number;
  birthday?: string;
  nationality?: string;
  subtitle?: string;
  image1?: string;
  image2?: string;
  description1?: string;
  description2?: string;
  experience?: string;
  skills?: string;
  specialization?: string;
  [key: string]: any;
}
