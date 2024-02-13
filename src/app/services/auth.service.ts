import { EventEmitter, Injectable, Output } from '@angular/core';
import {} from '@angular/fire/';
import {
  Auth,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() user: EventEmitter<User | null> = new EventEmitter<User | null>();
  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user.emit(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.user.emit(null);
        localStorage.removeItem('user');
      }
    });
  }

  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.removeItem('user');
    return this.auth.signOut();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
