import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  userInfo: Observable<any>;

  constructor(private localStorer: LocalStorageService) { }

  login(username: string, password: string): Observable<any> {
    if (username && password) {
      this.localStorer.set('currentUser', {
        username: username,
        password: password,
        isAuth: true
      });
    }
    return of(this.localStorer.get('currentUser'));
  }

  logout() {
    this.localStorer.remove('currentUser');
    return of(false);
  }

  isLegalAccount(): Observable<any> {
    const currentUser = this.localStorer.get('currentUser');
    return of(currentUser.isAuth);
  }
}
