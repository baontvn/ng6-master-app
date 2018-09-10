import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTwoRoutingModule } from './page-two-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PageTwoRoutingModule
  ],
  declarations: [
  ],
  entryComponents: [

  ]
})

export class PageTwoModule {
}
