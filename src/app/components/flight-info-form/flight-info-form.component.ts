import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { FlightInfo } from '../../models/flight-info.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import confetti from 'canvas-confetti';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormService } from '../../services/form/form.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-flight-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinner,
    HttpClientModule,
  ],
  templateUrl: './flight-info-form.component.html',
  styleUrl: './flight-info-form.component.scss',
})
export class FlightInfoFormComponent implements OnInit {
  flightInfoForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  isAuth: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formService: FormService,
    private router: Router
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.isAuth = this.authService.isAuthenticated();
  }
  ngOnInit(): void {
    this.initForm();
    this.authService.user$.subscribe((user) => {
      this.isAuth = user;
    });
  }

  //Initialize form
  initForm(): void {
    this.flightInfoForm = this.formBuilder.group({
      airline: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z\\s&-]+$')],
      ],
      arrivalDate: [
        new Date().toISOString().split('T')[0],
        Validators.required,
      ],
      arrivalTime: ['', Validators.required],
      flightNumber: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z0-9-]+$')],
      ],
      numOfGuests: ['', Validators.required],
      comments: [''],
    });
  }

  // Reset form
  resetForm(): void {
    this.flightInfoForm.reset();
    this.submitted = false;
  }

  // Get form controls
  get formControls() {
    return this.flightInfoForm.controls;
  }

  // Flight info form submission
  onSubmit(): void {
    if (this.flightInfoForm.valid) {
      if (this.isAuth) {
        this.loading = true;
        const payload: FlightInfo = this.flightInfoForm.value;

        this.formService.submitForm(payload).subscribe((response) => {
          if (response) {
            this.resetForm();
            this.celebrate();
            this.submitted = true;
          } else {
            alert('Something went wrong. Please try again.');
          }
          this.loading = false;
        });
      } else {
        alert('Authentication failed. Please sign in to submit flight info.');
      }
    } else {
      alert('Please fill in all required fields');
    }
  }

  celebrate() {
    const duration = 3000; // in milliseconds

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
    });

    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  }
}
