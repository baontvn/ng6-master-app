import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageOneRoutingModule} from './page-one-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { PageOneMainComponent } from './pages/page-one-main/page-one-main.component';
import { PageOneDetailComponent } from './pages/page-one-detail/page-one-detail.component';
import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PageOneRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    PageOneMainComponent,
    PageOneDetailComponent
  ],
  entryComponents: [

  ]
})

export class PageOneModule {
}
