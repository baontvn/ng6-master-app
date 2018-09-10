import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubOneRoutingModule } from './sub-one-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SubOneMainComponent } from './pages/sub-one-main/sub-one-main.component';
import { SubOneDetailComponent } from './pages/sub-one-detail/sub-one-detail.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SubOneRoutingModule
  ],
  declarations: [
    SubOneMainComponent,
    SubOneDetailComponent
  ],
  entryComponents: [

  ]
})

export class SubOneModule {
}
