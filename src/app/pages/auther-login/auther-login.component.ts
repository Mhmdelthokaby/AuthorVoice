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

      if (response && (response.Token || response.token) && (response.specificId || response.SpecificId)) {

        
        const role = response.Role ?? response.role;
        const token = response.token ?? response.token;
        const specificId = response.specificId ?? response.specificId;
        const MainId = response.mainId ?? response.mainId;

        this.authService.storeTokenAndId(token, specificId, role , MainId);
        await this.router.navigate(['/author']);
      } else {
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