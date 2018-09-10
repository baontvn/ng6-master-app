import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../../config/app.config';
import {IAppConfig} from '../../../config/iapp.config';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {ProgressBarService} from '../../services/progress-bar.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  appConfig: any;
  menuItems: any[];
  progressBarMode: string;
  currentLang: string;

  navTriggerIcon = faBars;

  appName = AppConfig.name;

  @Output() action = new EventEmitter();

  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
              private progressBarService: ProgressBarService,
              private translateService: TranslateService) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    this.loadMenus();
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
    });
  }

  toggleSideBar() {
    this.action.emit({
      type: 'toggleSideBar',
      data: true
    });
  }

  private loadMenus(): void {
    this.menuItems = [
      {link: '/', name: _('home')},
      {link: '/' + AppConfig.routes.heroes, name: _('heroesList')}
    ];
  }
}
