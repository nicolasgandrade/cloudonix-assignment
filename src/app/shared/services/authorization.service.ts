import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private readonly router = inject(Router);

  private _authToken = new BehaviorSubject<string>('');

  isAuthorized$ = this.authToken.pipe(map((token) => !!token.trim()));

  constructor() {
    const retrieved = localStorage.getItem('bearer');

    if (!!retrieved?.trim()) {
      this.setAuthToken(retrieved);
    }
  }

  get authToken(): Observable<string> {
    return this._authToken.asObservable();
  }

  setAuthToken(val: string) {
    this._authToken.next(val);
    localStorage.setItem('bearer', val);
  }

  logout(): void {
    localStorage.removeItem('bearer');
    this._authToken.next('');
    this.router.navigate(['login']);
  }
}
