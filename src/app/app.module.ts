import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_CONFIG, AppConfig } from './config/app.config';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProgressInterceptor } from './shared/interceptors/progress.interceptor';
import { TimingInterceptor } from './shared/interceptors/timing.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProgressBarService } from './core/services/progress-bar.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomePage } from './core/pages/home/home.page';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService] },
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
