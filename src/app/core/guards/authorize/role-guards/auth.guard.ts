import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthorizeService } from '../../../services/authorize.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthorizeService,
        private route: Router
    ) {
    }
    canActivate(): boolean|Observable<boolean> {
        return this.auth.isLegalAccount().pipe(
            map(rs => {
                if (!rs) {
                    this.route.navigate(['/login']);
                }
                return rs;
            })
        );
    }
}
