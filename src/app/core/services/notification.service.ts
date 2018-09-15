import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '../models/common.constant';

@Injectable()
export class NotificationService {

  constructor(
    private translate: TranslateService,
    private toastr: ToastrService
  ) {

  }

  success(message) {
    this.toastr.success(
      message,
      this.translate.instant(CommonConstant.NOTIFICATION_TITLE_SUCCESS)
    );
  }

  error(message) {
    this.toastr.error(
      message,
      this.translate.instant(CommonConstant.NOTIFICATION_TITLE_ERROR)
    );
  }

  custom(type: NotificationType, message: string) {
    switch (type) {
      case NotificationType.SUCCESS: {
        this.toastr.success(message, this.translate.instant(CommonConstant.NOTIFICATION_TITLE_SUCCESS));
        break;
      }
      case NotificationType.INFO: {
        this.toastr.info(message, this.translate.instant(CommonConstant.NOTIFICATION_TITLE_INFO));
        break;
      }
      case NotificationType.ERROR: {
        this.toastr.error(message, this.translate.instant(CommonConstant.NOTIFICATION_TITLE_ERROR));
        break;
      }
      default: {
        this.toastr.info(message, this.translate.instant(CommonConstant.NOTIFICATION_TITLE_WARNING));
        break;
      }
    }
  }
}

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}
