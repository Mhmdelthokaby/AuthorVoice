import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getUser();
    if (!user) {
      this.router.navigate(['/author-login']); // Fixed typo in route (was 'auther-login')
      return false;
    }
    
    // Properly access role through index signature
    const metadata = user.user_metadata as { ['role']?: string };
    const role = user.role || metadata?.['role'];
    
    if (role === 'author') return true;
    
    this.router.navigate(['/author-login']); // Fixed typo in route
    return false;
  }
}