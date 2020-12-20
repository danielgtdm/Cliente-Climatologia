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

import { ChartsModule } from 'ng2-charts';
import { PrecipitacionTfComponent } from './precipitacion-tf/precipitacion-tf.component';
import { PresionTfComponent } from './presion-tf/presion-tf.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TemperaturaTfComponent,
    PrecipitacionTfComponent,
    PresionTfComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbTreeGridModule,
    NbInputModule,
    NbSelectModule,
    ChartsModule
  ]
})
export class DashboardModule { }
