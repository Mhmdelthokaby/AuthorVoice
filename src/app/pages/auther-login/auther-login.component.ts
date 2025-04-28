import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
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
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/author']); // Redirect to author page after successful login
    } catch (error: any) {
      this.errorMessage = error.message || 'Login failed. Please try again.'; // Display error message
    } finally {
      this.loading = false;
    }
  }
}
