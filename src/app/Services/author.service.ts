import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http'; // Added HttpEvent, HttpRequest
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../url'
export interface Book {
  id: number;
  name: string;
  description: string;
  link?: string;
  image?: string;
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
  age: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  getAuthor(authorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${authorId}`);
  }

  updateProfile(authorId: number, profile: UpdateAuthorPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/${authorId}`, profile);
  }

 addBook(authorId: number, payload: BookForm): Observable<any> {
    const formData = new FormData();
    formData.append('Name', payload.name);
    formData.append('Description', payload.description);
    if (payload.link) {
      formData.append('Link', payload.link);
    }
    if (payload.imageFile) {
      formData.append('ImageFile', payload.imageFile, payload.imageFile.name);
    }

    return this.http.post<any>(
      `${this.apiUrl}/${authorId}/books`,
      formData
    );
  }

  updateBook(bookId: number, payload: FormData): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/book/${bookId}`,
      payload
    ).pipe(
      catchError(err => {
        console.error('Update book error:', err);
        return throwError(() => new Error(err.message || 'Failed to update book'));
      })
    );
  }

  deleteBook(bookId: number): Observable<any> {
    console.log(bookId);
    
    return this.http.delete<any>(`${this.apiUrl}/book/${bookId}`).pipe(
      catchError(err => {
        console.error('Delete book error:', err);
        return throwError(() => new Error(err.message || 'Failed to delete book'));
      })
    );
  }

  getAuthorBooks(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/${authorId}/books`);
  }


  uploadAuthorImage(authorId: number, imageFile: File, slot: 'image1' | 'image2' = 'image1'): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', imageFile, imageFile.name);

    return this.http.post(
      `${this.apiUrl}/${authorId}/upload-image?slot=${slot}`,
      formData
    ).pipe(
      catchError(err => {
        console.error(`Error uploading ${slot}:`, err);
        return throwError(() => new Error(`Failed to upload ${slot}: ${err.message || 'Unknown error'}`));
      })
    );
  }
}
export interface BookForm {
  name: string;
  description: string;
  link?: string;
  imageFile: File | null;
}