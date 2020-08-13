import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';
import { PrecipitacionComponent } from './precipitacion.component';
import { PrecipitacionRoutingModule } from './precipitacion-routing.module';

import { NbCardModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

@NgModule({
  declarations: [
    PrecipitacionComponent,
    GraficoRangoDiasComponent,
    GraficoRangoMesesComponent,
    GraficoRangoAniosComponent,
    TablaRangoDiasComponent,

  ],
  imports: [
    CommonModule,
    PrecipitacionRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    NbTreeGridModule,
    ChartsModule,
    NbButtonModule
  ]
})
export class PrecipitacionModule { }
