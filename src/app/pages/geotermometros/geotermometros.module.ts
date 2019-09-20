import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeotermometrosRoutingModule } from './geotermometros-routing.module';
import { GeotermometrosComponent } from './geotermometros.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';

import { NbCardModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GeotermometrosComponent, GraficoRangoDiasComponent, GraficoRangoMesesComponent, GraficoRangoAniosComponent],
  imports: [
    CommonModule,
    GeotermometrosRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    ChartsModule
  ]
})
export class GeotermometrosModule { }
