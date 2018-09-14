import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from './config/app.config';
import { AuthGuard } from './core/guards/authorize/role-guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './core/pages/home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: AppConfig.routes.login, loadChildren: './core/pages/login/login.module#LoginModule' },
  { path: AppConfig.routes.error404, loadChildren: './core/pages/error404/error404.module#Error404Module' },
  { path: '**', redirectTo: AppConfig.routes.error404 }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})

export class AppRoutingModule {
}
