import { NgModule, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProgressBarService } from './services/progress-bar.service';
import { LoggerService } from './services/logger.service';
import { HomePage } from './pages/home/home.page';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Page } from './pages/error404/error404.page';
import { HeroService } from '../modules/heroes/shared/hero.service';
import { EventManager } from './services/event-manager';
import { Spinner } from './services/spinner.service';
import { I18nService } from './services/i18n.service';
import { LocalStorageService } from './services/local-storage.service';
import { MainComponent } from './components/main/main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NavigatorComponent } from './components/navigator/navigator.component';
@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    NgZorroAntdModule
  ],
  declarations: [
    HomePage,
    Error404Page,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    NavigatorComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HomePage,
    NavigatorComponent
  ],
  providers: [
    HeroService,
    LoggerService,
    ProgressBarService,
    EventManager,
    Spinner,
    I18nService,
    LocalStorageService
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
