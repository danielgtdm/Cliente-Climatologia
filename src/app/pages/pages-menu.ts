import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'GRAFICOS',
    group: true,
  },
  {
    title: 'Temperaturas',
    icon: 'thermometer-outline',
    children: [
      {
        title: 'Rango de Dias',
        link: '/pages/temperaturas/grafico-rango-dias',
      },
      {
        title: 'Rango de Meses',
        link: '/pages/temperaturas/grafico-rango-meses',
      },
      {
        title: 'Rango de Años',
        link: '/pages/temperaturas/grafico-rango-anios',
      }
    ],
  },
  {
    title: 'Humedad',
    icon: 'percent-outline',
    children: [
      {
        title: 'Rango de Dias',
        link: '/pages/humedad/grafico-rango-dias',
      },
      {
        title: 'Rango de Meses',
        link: '/pages/humedad/grafico-rango-meses',
      },
      {
        title: 'Rango de Años',
        link: '/pages/humedad/grafico-rango-anios',
      }
    ],
  },
  {
    title: 'Precipitación',
    icon: 'droplet-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Rango de Dias',
        link: '/pages/precipitacion/grafico-rango-dias',
      },
      {
        title: 'Rango de Meses',
        link: '/pages/precipitacion/grafico-rango-meses',
      },
      {
        title: 'Rango de Años',
        link: '/pages/precipitacion/grafico-rango-anios',
      }
    ],
  },
  {
    title: 'Nubosidad',
    icon: 'cloud-upload-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  }
];
