import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SubTwoRoutingModule} from './sub-two-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import { SubTwoMainComponent } from './pages/sub-two-main/sub-two-main.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SubTwoRoutingModule
  ],
  declarations: [
    SubTwoMainComponent
  ],
  entryComponents: [

  ]
})

export class SubTwoModule {
}
