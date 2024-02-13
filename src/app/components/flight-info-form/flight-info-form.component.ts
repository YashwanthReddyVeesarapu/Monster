import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FlightInfo } from '../../models/flight-info.model';
import { environment } from '../../../../environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-info-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flight-info-form.component.html',
  styleUrl: './flight-info-form.component.scss',
})
export class FlightInfoFormComponent {
  flightInfoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.flightInfoForm = this.formBuilder.group({
      airline: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      flightNumber: ['', Validators.required],
      numOfGuests: ['', Validators.required],
      comments: [''],
    });
  }

  get formControls() {
    return this.flightInfoForm.controls;
  }

  onSubmit(): void {
    if (this.flightInfoForm.valid) {
      if (this.authService.isAuthenticated()) {
        const payload: FlightInfo = this.flightInfoForm.value;

        fetch(environment.apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: environment.token,
          },
          body: JSON.stringify(payload),
        })
          .then(async (response) => response.json())
          .then((data) => {
            if (data == true) {
              alert('Flight info submitted successfully');
            } else {
              alert('Something went wrong. Please try again.');
            }
          })
          .catch((err) => {
            alert('Failed to submit flight info');
          });
      } else {
        alert('Authentication failed. Please sign in to submit flight info.');
      }
    } else {
      alert('Please fill in all required fields');
    }
  }
}
