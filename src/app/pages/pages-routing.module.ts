import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'temperaturas',
      loadChildren: () => import('./temperaturas/temperaturas.module')
      .then(m => m.TemperaturasModule)
    },
    {
      path: 'precipitacion',
      loadChildren: () => import('./precipitacion/precipitacion.module')
      .then(m => m.PrecipitacionModule)
    },
    {
      path: 'humedad',
      loadChildren: () => import('./humedad/humedad.module')
      .then(m => m.HumedadModule)
    },
    {
      path: 'nubosidad',
      loadChildren: () => import('./nubosidad/nubosidad.module')
      .then(m => m.NubosidadModule)
    },
    {
      path: 'horas-sol',
      loadChildren: () => import('./horas-sol/horas-sol.module')
      .then(m => m.HorasSolModule)
    },
    {
      path: 'evaporimetro',
      loadChildren: () => import('./evaporimetro/evaporimetro.module')
      .then(m => m.EvaporimetroModule)
    },
    {
      path: 'presion-atmosferica',
      loadChildren: () => import('./presion-atmosferica/presion-atmosferica.module')
      .then(m => m.PresionAtmosfericaModule)
    },
    {
      path: 'visibilidad',
      loadChildren: () => import('./visibilidad/visibilidad.module')
      .then(m => m.VisibilidadModule)
    },
    {
      path: 'geotermometros',
      loadChildren: () => import('./geotermometros/geotermometros.module')
      .then(m => m.GeotermometrosModule)
    },
    {
      path: 'termometro-seco',
      loadChildren: () => import('./termometro-seco/termometro-seco.module')
      .then(m => m.TermometroSecoModule)
    },
    {
      path: 'termometro-humedo',
      loadChildren: () => import('./termometro-humedo/termometro-humedo.module')
      .then(m => m.TermometroHumedoModule)
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
