import { Component } from '@angular/core';
import { AuthService } from '../../Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auther-signup',
  templateUrl: './auther-signup.component.html',
  styleUrls: ['./auther-signup.component.css'],
})
export class AutherSignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Async method to handle sign-up
  async signUp() {
    // Check if password and confirm password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'كلمات المرور لا تتطابق';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Hardcode the role to 1 (Author)
    const userData = {
      Username: this.email,
      password: this.password,
      role: 1  // Role 1 for Author
    };

    try {
      const response = await this.authService.register(userData).toPromise();
      if (response) {
        this.successMessage = 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.';
        // Optionally, redirect to login page after successful sign-up
        setTimeout(() => {
          this.router.navigate(['/author-login']);
        }, 2000);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'فشل في التسجيل. يرجى المحاولة مرة أخرى.';
    } finally {
      this.loading = false;
    }
  }
}
