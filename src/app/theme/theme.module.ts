import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
} from '@nebular/theme';
import { HeaderComponent } from '../theme/components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { WindowModeBlockScrollService } from './services/window-mode-block-scroll.service';


const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LayoutComponent],
  imports: [
    CommonModule,
    NB_MODULES
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [],
        ).providers,
        WindowModeBlockScrollService,
      ],
    };
  }
}
