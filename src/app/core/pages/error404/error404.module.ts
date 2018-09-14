import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Page } from './error404.page';
import { Error404RoutingModule } from './error404-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    Error404RoutingModule,
    SharedModule
  ],
  declarations: [Error404Page],
  exports: [Error404Page]
})
export class Error404Module { }
