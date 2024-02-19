import { Injectable } from '@angular/core';
import { FlightInfo } from '../../models/flight-info.model';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {}

  // Submit form data to the server
  submitForm(payload: FlightInfo): Observable<any> {
    return this.http.post(environment.apiURL, payload, {
      headers: {
        'Content-Type': 'application/json',
        token: environment.token,
      },
    });
  }
}
