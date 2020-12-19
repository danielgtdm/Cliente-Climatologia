import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresionAtmosfericaComponent } from './presion-atmosferica.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

import { PresionAtmosfericaRoutingModule } from './presion-atmosferica-routing.module';

import { NbDatepickerModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PresionAtmosfericaComponent,
    GraficoRangoDiasComponent,
    TablaRangoDiasComponent
  ],
  imports: [
    CommonModule,
    PresionAtmosfericaRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    NbTreeGridModule,
    ChartsModule,
    NbButtonModule
  ]
})
export class PresionAtmosfericaModule { }
