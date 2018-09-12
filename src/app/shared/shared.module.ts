import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { TreeviewChartComponent } from './components';

const sharedComponents = [
  TreeviewChartComponent
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    NgZorroAntdModule
  ],
  declarations: [
    ...sharedComponents
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    NgZorroAntdModule,
    ...sharedComponents
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})

export class SharedModule {
}
