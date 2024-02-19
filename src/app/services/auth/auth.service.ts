import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { AuthModel } from '../../models/auth.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthModel {
  user$: Subject<boolean> = new Subject<boolean>();

  // Inject the Auth service
  constructor(@Optional() private auth: Auth) {
    if (auth) {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.user$.next(true);
        } else {
          localStorage.removeItem('user');
          this.user$.next(false);
        }
      });
    }
  }

  // Sign in with email and password
  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Sign in with Google
  googleSignIn(): Promise<any> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // Sign out
  signOut(): Promise<void> {
    localStorage.removeItem('user');
    this.user$.next(false);
    return this.auth.signOut();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
