import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const pageTwoRoutes: Routes = [
  { path: '', redirectTo: 'sub-one', pathMatch: 'full' },
  { path: 'sub-one', loadChildren: './modules/sub-one/sub-one.module#SubOneModule' },
  { path: 'sub-two', loadChildren: './modules/sub-two/sub-two.module#SubTwoModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(pageTwoRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class PageTwoRoutingModule {
}
