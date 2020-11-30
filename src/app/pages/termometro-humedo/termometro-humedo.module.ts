import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermometroHumedoComponent } from './termometro-humedo.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';

import { TermometroHumedoRoutingModule } from './termometro-humedo-routing.module';

import { NbDatepickerModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

@NgModule({
  declarations: [
    TermometroHumedoComponent, 
    GraficoRangoDiasComponent,
    TablaRangoDiasComponent
  ],
  imports: [
    CommonModule,
    TermometroHumedoRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    NbTreeGridModule,
    ChartsModule,
    NbButtonModule
  ]
})
export class TermometroHumedoModule { }
