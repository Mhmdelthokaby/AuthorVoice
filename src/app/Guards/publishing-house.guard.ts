import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class PublishingHouseGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = localStorage.getItem('role');

    if (isLoggedIn && role === '2') {
      return true;
    } else {
      this.router.navigate(['/publish-login']);
      return false;
    }
  }
}
