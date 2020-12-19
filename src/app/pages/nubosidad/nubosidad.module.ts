import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NubosidadComponent } from './nubosidad.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

import { NubosidadRoutingModule } from './nubosidad-routing.module';

import { NbCardModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    NubosidadComponent,
    GraficoRangoDiasComponent,
    TablaRangoDiasComponent
  ],
  imports: [
    CommonModule,
    NubosidadRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    ChartsModule,
    NbTreeGridModule,
    NbButtonModule
  ]
})
export class NubosidadModule { }
