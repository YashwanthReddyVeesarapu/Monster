import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FlightInfoFormComponent } from './components/flight-info-form/flight-info-form.component';
import { AboutComponent } from './components/about/about.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FlightInfoFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
