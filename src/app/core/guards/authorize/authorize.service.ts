import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  userInfo: Observable<any>;

  constructor() { }

  isLegalAccount(): Observable<any> {
    return of(false);
  }
}
