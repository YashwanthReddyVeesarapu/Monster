import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FlightInfoFormComponent } from './components/flight-info-form/flight-info-form.component';
import { AuthGuard } from './AuthGuard';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: FlightInfoFormComponent,
    canActivate: [AuthGuard],
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
