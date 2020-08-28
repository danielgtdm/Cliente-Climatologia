import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermometroSecoComponent } from './termometro-seco.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

import { TermometroSecoRoutingModule } from './termometro-seco-routing.module';

import { NbDatepickerModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';
import { HistorialDiaComponent } from './historial-dia/historial-dia.component';

@NgModule({
  declarations: [
    TermometroSecoComponent, 
    GraficoRangoDiasComponent, 
    GraficoRangoMesesComponent, 
    GraficoRangoAniosComponent, 
    TablaRangoDiasComponent, HistorialDiaComponent
  ],
  imports: [
    CommonModule,
    TermometroSecoRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    NbTreeGridModule,
    ChartsModule,
    NbButtonModule
  ]
})
export class TermometroSecoModule { }
