import { Component } from '@angular/core';
import { AuthService } from '../../../Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-publishing-house',
  templateUrl: './signup-publishing-house.component.html',
  styleUrls: ['./signup-publishing-house.component.css']
})
export class SignupPublishingHouseComponent {
  
email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';
  constructor(private authService: AuthService, private router: Router) {}
  async signUp() {
    // Check if password and confirm password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'كلمات المرور لا تتطابق';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Hardcode the role to 2 (publisher)
    const userData = {
      Username: this.email,
      password: this.password,
      role: 2  // Role 2 for publisher
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
