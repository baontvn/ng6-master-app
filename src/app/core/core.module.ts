import { NgModule, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProgressBarService } from './services/progress-bar.service';
import { LoggerService } from './services/logger.service';
import { EventManager } from './services/event-manager';
import { Spinner } from './services/spinner.service';
import { I18nService } from './services/i18n.service';
import { LocalStorageService } from './services/local-storage.service';
import { MaterialModule } from '../shared/modules/material.module';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    LoggerService,
    ProgressBarService,
    EventManager,
    Spinner,
    I18nService,
    LocalStorageService,
    NotificationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
