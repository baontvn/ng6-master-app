import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PageOneMainComponent } from './pages/page-one-main/page-one-main.component';
import { PageOneDetailComponent } from './pages/page-one-detail/page-one-detail.component';

const heroesRoutes: Routes = [
  {path: '', component: PageOneMainComponent},
  {path: ':id', component: PageOneDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class PageOneRoutingModule {
}
