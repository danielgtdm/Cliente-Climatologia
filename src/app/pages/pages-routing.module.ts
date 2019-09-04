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
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
