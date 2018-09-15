import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    MaterialModule
  ]
})

export class SharedModule {
}
