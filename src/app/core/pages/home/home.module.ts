import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from '../../components/main/main.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    NavigatorComponent
  ],
  exports: [HomePage]
})
export class HomeModule { }
