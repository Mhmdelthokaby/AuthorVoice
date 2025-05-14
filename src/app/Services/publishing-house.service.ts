import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublishUrl } from '../url';
import { Observable ,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublishingService {
  private apiUrl = PublishUrl;

  constructor(private http: HttpClient) {}

  // LocalStorage Utilities
  storePublishingHouseId(publishingHouseId: number): void {
    localStorage.setItem('userId', publishingHouseId.toString());
  }

  getPublishingHouseId(): string | null {
    return localStorage.getItem('userId');
  }

  clearPublishingHouseId(): void {
    localStorage.removeItem('userId');
  }


  getPublishingHouse(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}


  updatePublishingText(id: number, data: { Name: string; Subtitle: string; AboutUs: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/text`, data);
  }

  updatePublishingImages(id: number, imageFile: File, slot: 'image1' | 'image2' = 'image1'): Observable<any> {
  const formData = new FormData();
  formData.append('imageFile', imageFile, imageFile.name); // This matches what the backend expects

  return this.http.put(
    `${this.apiUrl}/${id}/images?slot=${slot}`, // <-- Ensure PUT not POST
    formData
  ).pipe(
    catchError(err => {
      console.error(`Error uploading ${slot}:`, err);
      return throwError(() => new Error(`Failed to upload ${slot}: ${err.message || 'Unknown error'}`));
    })
  );
}


  // Book
  updateBookText(publishingHouseId: number, bookId: number, data: { Title: string; Author: string; Description: string; PublishingDate: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Book/${bookId}/text`, data);
  }

  updateBookImage(publishingHouseId: number, bookId: number, data: { CoverImgae: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Book/${bookId}/image`, data);
  }

  addBook(publishingHouseId: number, book: any): Observable<any> {
  const formData = new FormData();
  formData.append('Title', book.title);
  formData.append('Author', book.author);
  formData.append('Description', book.description);
  if (book.coverImgae) {
    formData.append('CoverImgae', book.coverImgae);
  }

  return this.http.post(`${this.apiUrl}/${publishingHouseId}/Book`, formData, {
  responseType: 'text'
});
}


  deleteBook(publishingHouseId: number, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${publishingHouseId}/Book/${id}`);
  }

  // Category
  updateCategoryText(publishingHouseId: number, categoryId: number, data: { Name: string; Description: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Category/${categoryId}/text`, data);
  }

  updateCategoryImage(publishingHouseId: number, categoryId: number, data: { Image: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Category/${categoryId}/image`, data);
  }

  addCategory(publishingHouseId: number, category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${publishingHouseId}/Category`, category ,{
  responseType: 'text'
});
  }

  deleteCategory(publishingHouseId: number, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${publishingHouseId}/Category/${id}`,{
  responseType: 'text'
});
  }

  // Service
  updateServiceText(publishingHouseId: number, serviceId: number, data: { Name: string; Description: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Service/${serviceId}/text`, data);
  }

  updateServiceImage(publishingHouseId: number, serviceId: number, data: { Image: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Service/${serviceId}/image`, data);
  }

  addService(publishingHouseId: number, service: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${publishingHouseId}/Service`, service ,{
  responseType: 'text'
});
  }


  deleteService(publishingHouseId: number, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${publishingHouseId}/Service/${id}`,{
  responseType: 'text'
});
  }

  // Goal
  updateGoalText(publishingHouseId: number, goalId: number, data: { Text: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Goal/${goalId}/text`, data);
  }

  addGoal(publishingHouseId: number, goal: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${publishingHouseId}/Goal`, goal ,{
  responseType: 'text'
});
  }

  deleteGoal(publishingHouseId: number, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${publishingHouseId}/Goal/${id}`,{
  responseType: 'text'
});
  }

  // Connect
  updateConnectText(publishingHouseId: number, connectId: number, data: { Title: string; Description: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Connect/${connectId}/text`, data);
  }

  addConnect(publishingHouseId: number, connect: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${publishingHouseId}/Connect`, connect , {
  responseType: 'text'
});
  }

  deleteConnect(publishingHouseId: number, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${publishingHouseId}/Connect/${id}`, {
  responseType: 'text'
});
  }

  // Join
  updateJoinText(publishingHouseId: number, joinId: number, data: { Title: string; Description: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publishingHouseId}/Join/${joinId}/text`, data, {
  responseType: 'text'
});
  }

  addJoin(publishingHouseId: number, join: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${publishingHouseId}/Join`, join ,{
  responseType: 'text'
});;
  }

  deleteJoin(publishingHouseId: number, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${publishingHouseId}/Join/${id}`);
  }

  // Get publishing house by user ID
  getPublishingHouseByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
