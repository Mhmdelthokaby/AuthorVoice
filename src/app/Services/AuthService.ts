import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://theauthors.runasp.net/api/User';  // Full server URL

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // Register User with Role
  register(userData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`, 
      userData, 
      this.getHttpOptions()
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Login User and Get JWT Token
  login(userData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`, 
      userData, 
      this.getHttpOptions()
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Store JWT Token and User ID in localStorage
  storeTokenAndId(token: string, userId: number, role: string , mainId: number): void {
    localStorage.setItem('authToken', token); // Store the JWT token
    localStorage.setItem('userId', userId.toString()); // Store the User ID
    localStorage.setItem('role', role); // Store the user role (optional)
    localStorage.setItem('mainId', mainId.toString());
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
    localStorage.removeItem('mainId');

  }

  // Check if User is Logged In (based on token presence)
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearTokenAndId();
  }

  deleteUser(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`,{
  responseType: 'text'
});
}
}
