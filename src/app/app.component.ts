import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { AppConfig } from './config/app.config';
declare const Modernizr;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})

export class AppComponent implements OnInit {
  appName = AppConfig.name;

  constructor(
    private translateService: TranslateService,
    private title: Title
  ) {
  }

  ngOnInit() {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.title.setTitle(this.appName);
    this.checkBrowserFeatures();
  }

  checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }

    if (!supported) {
      this.translateService.get([String(_('updateBrowser'))]).subscribe((texts) => {
        // this.snackBar.create('warning', texts['updateBrowser']);
      });
    }

    return supported;
  }
}
