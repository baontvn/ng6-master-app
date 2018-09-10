import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SubOneMainComponent } from './pages/sub-one-main/sub-one-main.component';
import { SubOneDetailComponent } from './pages/sub-one-detail/sub-one-detail.component';

const heroesRoutes: Routes = [
  {path: '', component: SubOneMainComponent},
  {path: ':id', component: SubOneDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SubOneRoutingModule {
}
