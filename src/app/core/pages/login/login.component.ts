import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../../../config/app.config';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorize.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  appName = AppConfig.name;

  loginFormGroup: FormGroup;

  hidePassword = true;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthorizeService
  ) {
    this.buildLoginForm();
  }

  ngOnInit() {

  }

  buildLoginForm() {
    this.loginFormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin() {
    const userName = this.loginFormGroup.get('userName').value;
    const password = this.loginFormGroup.get('password').value;

    this.authService.login(userName, password).subscribe(rs => {
      this.router.navigate(['']);
    });
  }

}
