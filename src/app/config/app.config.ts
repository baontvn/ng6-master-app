import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  name: 'Master UI App',
  routes: {
    error404: '404',
    page1: 'page-one',
    page2: 'page-two',
    login: 'login'
  },
  endpoints: {

  },
  userSetting: [
    {
      feature: 'setting',
      name: 'header.user-setting.setting',
      route: 'user-setting/setting'
    },
    {
      feature: 'logout',
      name: 'header.user-setting.log-out',
      route: ''
    }
  ]
};
