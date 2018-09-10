import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../../config/app.config';
import { IAppConfig } from '../../../config/iapp.config';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  appConfig: any;
  menuItems: any[];
  currentLang: string;

  appName = AppConfig.name;

  isCollapsed: Boolean = false;

  @Output() action = new EventEmitter();

  constructor(
    @Inject(APP_CONFIG) appConfig: IAppConfig,
    private router: Router,
    private translateService: TranslateService
    ) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    this.loadMenus();
    // this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
    //   this.progressBarMode = mode;
    // });
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
    });
  }

  gotoHomePage() {
    this.router.navigate(['/']);
  }

  private loadMenus(): void {
    this.menuItems = [
      { link: '/', name: _('home') },
      { link: '/' + AppConfig.routes.heroes, name: _('heroesList') }
    ];
  }
}
