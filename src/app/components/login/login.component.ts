import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService
        .signIn(email, password)
        .then((response) => {
          console.log(response);
          alert('Login Success!');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          alert('Login failed. Please try again.');
        });
    } else {
      alert('Please enter valid username and password');
    }
  }
}
