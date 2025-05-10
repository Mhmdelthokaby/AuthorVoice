import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthorGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = localStorage.getItem('role');  // or use a getUserRole() if you add one

    if (isLoggedIn && role === '1') {
      return true;
    } else {
      this.router.navigate(['/author‑login']);
      return false;
    }
  }
}
