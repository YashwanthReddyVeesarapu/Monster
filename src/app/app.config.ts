import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'monster-yash',
          appId: '1:432878404163:web:08f3eaf109469f77a80af6',
          storageBucket: 'monster-yash.appspot.com',
          apiKey: 'AIzaSyCCPpmWSYZna2RrblmcHdvj49X3GFmwxdw',
          authDomain: 'monster-yash.firebaseapp.com',
          messagingSenderId: '432878404163',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
