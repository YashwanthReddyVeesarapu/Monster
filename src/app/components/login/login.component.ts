import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // Email and password loading state
  loading1: boolean = false;
  // Google sign in loading state
  loading2: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Redirect to home if user is already authenticated
    if (authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize the form
  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading1 = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService
        .signIn(email, password)
        .then((response) => {
          this.snackBar.open('Login successful', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 5000,
          });
        })
        .finally(() => {
          this.loading1 = false;
        });
    } else {
      this.snackBar.open('Please enter valid email and password', 'Close', {
        duration: 5000,
      });
    }
  }

  // Handle Google sign in
  googleSignIn(): void {
    this.loading2 = true;
    this.authService
      .googleSignIn()
      .then(() => {
        this.snackBar.open('Login successful', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 5000,
        });
      })
      .finally(() => {
        this.loading2 = false;
      });
  }
}
