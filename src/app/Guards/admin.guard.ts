import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = localStorage.getItem('role');  // or use a getUserRole() if you add one
    const userId = localStorage.getItem('userId');
    if (isLoggedIn && role === '0' && userId ==='1') {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}
