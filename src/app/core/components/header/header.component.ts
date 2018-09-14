import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../../config/app.config';
import { IAppConfig } from '../../../config/iapp.config';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { Router } from '@angular/router';
import {ProgressBarService} from '../../services/progress-bar.service';
import { User } from '../../models/user.model';

const LOG_OUT_FEATURE = 'logout';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  appConfig: any;
  currentLang: string;

  appName = AppConfig.name;
  currentUser: User;

  progressBarMode: string;

  @Output() action = new EventEmitter();

  constructor(
    @Inject(APP_CONFIG) appConfig: IAppConfig,
    private router: Router,
    private translate: TranslateService,
    private progressBarService: ProgressBarService
    ) {
    this.appConfig = appConfig;

    this.currentUser = {
      id: 1,
      name: 'Mock User',
      email: 'mock.user@gmail.com'
    };
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  gotoHomePage() {
    this.router.navigate(['/']);
  }

  handleUserSetting(userSetting) {
    if (userSetting.feature === LOG_OUT_FEATURE) {
      console.log('Logout');
    }

    if (userSetting.route !== '') {
      console.log('Navigate to user setting page');
      // this.router.navigate([userSetting.route]);
    }
  }
}
