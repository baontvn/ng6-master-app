import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppConfig} from './config/app.config';
import {HomePage} from './core/pages/home/home.page';
import {Error404Page} from './core/pages/error404/error404.page';

const routes: Routes = [
  {path: '', redirectTo: AppConfig.routes.page1, pathMatch: 'full'},
  {path: AppConfig.routes.error404, component: Error404Page},
  {path: AppConfig.routes.page1, loadChildren: './modules/page-one/page-one.module#PageOneModule'},
  {path: AppConfig.routes.page2, loadChildren: './modules/page-two/page-two.module#PageTwoModule'},
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
