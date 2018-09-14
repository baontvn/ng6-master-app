import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AppConfig } from '../../../config/app.config';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            { path: '', redirectTo: AppConfig.routes.page1, pathMatch: 'full' },
            { path: AppConfig.routes.page1, loadChildren: '../../../modules/page-one/page-one.module#PageOneModule' },
            { path: AppConfig.routes.page2, loadChildren: '../../../modules/page-two/page-two.module#PageTwoModule' },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
