import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaporimetroComponent } from './evaporimetro.component';
import { GraficoRangoDiasComponent } from './grafico-rango-dias/grafico-rango-dias.component';
import { GraficoRangoMesesComponent } from './grafico-rango-meses/grafico-rango-meses.component';
import { GraficoRangoAniosComponent } from './grafico-rango-anios/grafico-rango-anios.component';
import { TablaRangoDiasComponent } from './tabla-rango-dias/tabla-rango-dias.component';

const routes: Routes = [{
    path: '',
    component: EvaporimetroComponent,
    children: [
      {
        path: 'grafico-rango-dias',
        component: GraficoRangoDiasComponent
      },
      {
        path: 'grafico-rango-meses',
        component: GraficoRangoMesesComponent
      },
      {
        path: 'grafico-rango-anios',
        component: GraficoRangoAniosComponent
      },
      {
        path: 'tabla-rango-dias',
        component: TablaRangoDiasComponent
      }
    ],
  }];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class EvaporimetroRoutingModule {
  }