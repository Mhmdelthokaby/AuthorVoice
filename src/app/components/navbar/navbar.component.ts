import { Component } from '@angular/core';
import { AuthService } from '../../Services/AuthService'; // adjust path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout(); // or clearTokenAndId()
    this.router.navigate(['/']); // redirect to login page
}
}