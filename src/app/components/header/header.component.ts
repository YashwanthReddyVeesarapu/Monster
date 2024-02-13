import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user!: User;
  isAuthenticated: boolean;
  constructor(private authService: AuthService, private router: Router) {
    // Check if user is authenticated
    this.isAuthenticated = this.authService.isAuthenticated();
    authService.user.subscribe((user) => {
      this.user = user!;
      this.isAuthenticated = user ? true : false;
    });
  }

  // Logout
  logout(): void {
    console.log('Logging out');
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
