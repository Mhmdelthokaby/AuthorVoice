import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://theauthors.runasp.net/api/User';  // Your API URL for authentication

  constructor(private http: HttpClient) {}

  // Register User with Role
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login User and Get JWT Token
  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  // Store JWT Token and User ID in localStorage
  storeTokenAndId(token: string, userId: number, role: string): void {
    localStorage.setItem('authToken', token); // Store the JWT token
    localStorage.setItem('userId', userId.toString()); // Store the User ID
    localStorage.setItem('role', role); // Store the user role (optional)
  }

  // Get stored JWT Token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Get stored User ID
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Clear JWT Token and User ID from localStorage
  clearTokenAndId(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  // Check if User is Logged In (based on token presence)
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
