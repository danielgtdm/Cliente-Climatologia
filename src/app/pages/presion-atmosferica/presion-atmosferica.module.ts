import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresionAtmosfericaRoutingModule } from './presion-atmosferica-routing.module';
import { PresionAtmosfericaComponent } from './presion-atmosferica.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';

import { NbCardModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [PresionAtmosfericaComponent, GraficoRangoDiasComponent, GraficoRangoMesesComponent, GraficoRangoAniosComponent],
  imports: [
    CommonModule,
    PresionAtmosfericaRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    ChartsModule
  ]
})
export class PresionAtmosfericaModule { }
