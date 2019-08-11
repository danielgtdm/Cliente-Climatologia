import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';
import { TemperaturasComponent } from './temperaturas.component';
import { TemperaturasRoutingModule } from './temperaturas-routing.module';

import { NbCardModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GraficoRangoDiasComponent, GraficoRangoMesesComponent, GraficoRangoAniosComponent, TemperaturasComponent],
  imports: [
    CommonModule,
    TemperaturasRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    ChartsModule
  ]
})
export class TemperaturasModule { }
