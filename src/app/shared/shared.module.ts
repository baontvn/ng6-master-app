import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    })
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
