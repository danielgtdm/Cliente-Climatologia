import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermometroHumedoRoutingModule } from './termometro-humedo-routing.module';
import { TermometroHumedoComponent } from './termometro-humedo.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';

import { NbCardModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

@NgModule({
  declarations: [TermometroHumedoComponent, GraficoRangoDiasComponent, GraficoRangoMesesComponent, GraficoRangoAniosComponent, TablaRangoDiasComponent],
  imports: [
    CommonModule,
    TermometroHumedoRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    NbTreeGridModule,
    ChartsModule
  ]
})
export class TermometroHumedoModule { }
