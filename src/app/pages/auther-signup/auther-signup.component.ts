import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auther-signup',
  templateUrl: './auther-signup.component.html',
  styleUrls: ['./auther-signup.component.css']
})
export class AutherSignupComponent {

  email = '';
  password = '';
  confirmPassword = ''; // Add confirm password field
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Method for sign-up
  async signUp() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simple form validation
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.loading = false;
      return;
    }

    try {
      await this.authService.signUp(this.email, this.password);
      this.successMessage = 'Signup successful! Please log in.';
      this.router.navigate(['/auther-login']); // Redirect to login page
    } catch (error: any) {
      this.errorMessage = error.message || 'Signup failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
