import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  darkMode: boolean;
  user: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private darkModeService: DarkModeService
  ) {
    // Check if user is authenticated
    this.user = this.authService.isAuthenticated();
    // Dark mode
    this.darkMode = this.darkModeService.isDarkMode();
  }
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.darkModeService.darkMode$.subscribe((darkMode) => {
      this.darkMode = darkMode;
    });
  }

  // Logout
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  // Toggle dark mode
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
