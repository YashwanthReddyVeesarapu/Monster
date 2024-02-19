import { Subject } from 'rxjs';

export interface AuthModel {
  user$: Subject<boolean>;
  signIn(email: string, password: string): Promise<any>;
  signOut(): Promise<void>;
  isAuthenticated(): boolean;
}
