import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeService } from '../../services/authorize.service';
import { AuthGuard } from './role-guards/auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthorizeService,
    AuthGuard
  ]
})
export class AuthorizeModule { }
