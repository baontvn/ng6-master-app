import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SubTwoMainComponent } from './pages/sub-two-main/sub-two-main.component';

const heroesRoutes: Routes = [
  {path: '', component: SubTwoMainComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SubTwoRoutingModule {
}
