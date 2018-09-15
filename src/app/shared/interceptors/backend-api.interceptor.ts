import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
    HttpSentEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { AuthorizeService } from '../../core/services/authorize.service';
import { NotificationService } from '../../core/services/notification.service';
import { CommonConstant } from '../../core/models/common.constant';

const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_FORBIDDEN = 403;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_ERROR_SERVER = 500;

@Injectable()
export class BackendAPIInterceptor implements HttpInterceptor {
    constructor(
        private translate: TranslateService,
        private router: Router,
        private notifier: NotificationService,
        private authService: AuthorizeService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const url = req.url;

        if (url.startsWith('/data-query/')) {
            req = req.clone({
                url: `${environment.dataQuery}/${url.substring(12)}`
            });
        }

        return next
            .handle(req)
            .do(event => {
                if (event instanceof HttpResponse) {
                    // Do nothing
                }
            })
            .catch(response => {
                if (response instanceof HttpErrorResponse) {
                    const parsedRes = <HttpErrorResponse> response;
                    this.handleErrorByStatus(parsedRes);
                    return Observable.throw(response);
                }
                return Observable.throw(response);
            });
    }

    handleErrorByStatus(response: HttpErrorResponse) {
        this.notifier.error(
            this.translate.instant(CommonConstant.NOTIFICATION_ERROR_UNATHORIZED)
        );
        switch (response.status) {
            case STATUS_CODE_UNAUTHORIZED: {
                this.authService.logout().subscribe(rs => {
                    this.router.navigate(['login']);
                });
                this.notifier.error(
                    this.translate.instant(CommonConstant.NOTIFICATION_ERROR_UNATHORIZED)
                );
                break;
            }
            case STATUS_CODE_FORBIDDEN: {
                this.notifier.error(
                    this.translate.instant(
                        CommonConstant.NOTIFICATION_ERROR_ACCESS_DENIED
                    )
                );
                break;
            }
            case STATUS_CODE_NOT_FOUND: {
                this.notifier.error(
                    this.translate.instant(CommonConstant.NOTIFICATION_ERROR_NOT_FOUND)
                );
                break;
            }
            case STATUS_CODE_ERROR_SERVER: {
                this.notifier.error(this.translate.instant(CommonConstant.NOTIFICATION_ERROR_ACCESS_DENIED));
                break;
            }
            default:
                break;
        }
    }
}
