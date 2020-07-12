import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TemperaturaTfComponent } from './temperatura-tf/temperatura-tf.component';

import { NbCardModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbInputModule } from '@nebular/theme';
import { NbSelectModule } from '@nebular/theme';


@NgModule({
  declarations: [
    DashboardComponent,
    TemperaturaTfComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbTreeGridModule,
    NbInputModule,
    NbSelectModule
  ]
})
export class DashboardModule { }
