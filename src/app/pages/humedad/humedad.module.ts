import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumedadComponent } from './humedad.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

import { HumedadRoutingModule } from './humedad-routing.module';

import { NbCardModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
  HumedadComponent,
  GraficoRangoDiasComponent,
  GraficoRangoMesesComponent,
  GraficoRangoAniosComponent,
  TablaRangoDiasComponent
],
  imports: [
    CommonModule,
    HumedadRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    ChartsModule,
    NbTreeGridModule,
    NbButtonModule
  ]
})
export class HumedadModule { }
