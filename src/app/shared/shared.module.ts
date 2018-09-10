import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    FontAwesomeModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    FontAwesomeModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})

export class SharedModule {
}
