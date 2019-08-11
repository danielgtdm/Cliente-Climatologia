import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    NbMenuModule,
    ThemeModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
