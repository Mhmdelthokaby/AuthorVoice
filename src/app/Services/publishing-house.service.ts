import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublishUrl } from '../url';

@Injectable({
  providedIn: 'root'
})
export class PublishingService {
  private apiUrl = PublishUrl;

  constructor(private http: HttpClient) {}

  // 🟥 دار النشر - النصوص
  updatePublishingText(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}/text`, data);
  }

  // 🟥 دار النشر - الصور
  updatePublishingImages(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}/images`, data);
  }

  // 🟣 الكتاب - النص
  updateBookText(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Book/${id}/text`, data);
  }

  // 🟣 الكتاب - الصورة
  updateBookImage(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Book/${id}/image`, data);
  }

  // 🟢 الفئة - النص
  updateCategoryText(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Category/${id}/text`, data);
  }

  // 🟢 الفئة - الصورة
  updateCategoryImage(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Category/${id}/image`, data);
  }

  // 🟡 الخدمة - النص
  updateServiceText(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Service/${id}/text`, data);
  }

  // 🟡 الخدمة - الصورة
  updateServiceImage(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Service/${id}/image`, data);
  }

  // 🔵 الهدف
  updateGoalText(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Goal/${id}/text`, data);
  }

  // 🟤 التواصل
  updateConnectText(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Connect/${id}/text`, data);
  }

  // ⚫ الانضمام
  updateJoinText(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/Join/${id}/text`, data);
  }

  // ❌ حذف دار نشر
  deletePublishing(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
