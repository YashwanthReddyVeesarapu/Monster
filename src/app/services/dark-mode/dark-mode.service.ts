import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.updateTheme();
  }

  // Toggle dark mode
  toggleDarkMode(): void {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      this.darkMode$.next(false);
    } else {
      localStorage.setItem('theme', 'dark');
      this.darkMode$.next(true);
    }
    this.updateTheme();
  }

  // Check if dark mode is enabled
  isDarkMode(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }

  // Update theme
  private updateTheme(): void {
    document.documentElement.setAttribute(
      'theme',
      localStorage.getItem('theme') || 'light'
    );
  }
}
