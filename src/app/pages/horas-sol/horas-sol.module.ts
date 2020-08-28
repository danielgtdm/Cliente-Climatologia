import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorasSolComponent } from './horas-sol.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

import { HorasSolRoutingModule } from './horas-sol-routing.module';

import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbButtonComponent } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';
import { HistorialDiaComponent } from './historial-dia/historial-dia.component';

@NgModule({
  declarations: [
    HorasSolComponent,
    GraficoRangoDiasComponent,
    GraficoRangoMesesComponent, 
    GraficoRangoAniosComponent, TablaRangoDiasComponent, HistorialDiaComponent
  ],
  imports: [
    CommonModule,
    HorasSolRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    ChartsModule,
    NbTreeGridModule,
    NbButtonModule
  ]
})
export class HorasSolModule { }
