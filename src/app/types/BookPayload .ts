export interface BookPayload {
  name: string;
  description: string;
  link?: string;
  image?: string;
  imageFile?: File;  // Add this if the service expects it
}
