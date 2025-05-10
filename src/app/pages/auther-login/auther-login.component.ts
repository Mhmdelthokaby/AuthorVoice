import { Component } from '@angular/core';
import { AuthService } from '../../Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auther-login',
  templateUrl: './auther-login.component.html',
  styleUrls: ['./auther-login.component.css'],
})
export class AutherLoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    this.loading = true;
    this.errorMessage = '';

    const userData = { Username: this.email, Password: this.password };
    console.log('Sending login data:', userData);

    try {
      const response = await this.authService.login(userData).toPromise();
      console.log('Raw login response:', response);

      if (response && (response.Token || response.token) && (response.Id || response.id)) {
        let specificId: number;
        const role = response.Role ?? response.role;
        const token = response.Token ?? response.token;
        const idObj = response.Id ?? response.id;

        if (role === undefined || role === null) {
          throw new Error('Role is missing in the response');
        }

        if (role === 0) {
          specificId = idObj.AdminId ?? idObj.adminId;
          console.log('Extracted AdminId:', specificId);
        } else if (role === 1) {
          specificId = idObj.AuthorId ?? idObj.authorId; // Handle lowercase authorId
          console.log('Extracted AuthorId:', specificId);
        } else if (role === 2) {
          specificId = idObj.PublishingId ?? idObj.publishingId;
          console.log('Extracted PublishingId:', specificId);
        } else {
          throw new Error('Unknown role: ' + role);
        }

        if (specificId === undefined || specificId === null) {
          throw new Error('Specific ID is missing for role: ' + role);
        }

        console.log('Storing token, ID, and role:', { token, id: specificId, role });
        this.authService.storeTokenAndId(token, specificId, role);
        console.log('After storeTokenAndId call');
        await this.router.navigate(['/author']);
        console.log('Navigation to /author completed');
      } else {
        console.log('Invalid response structure:', response);
        this.errorMessage = 'Login failed. Please try again.';
      }
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        error: error.error
      });
      this.errorMessage = error.message || 'Login failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}