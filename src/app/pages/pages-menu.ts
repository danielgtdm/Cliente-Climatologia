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
        title: 'Rango de Dias',
        link: '/pages/nubosidad/grafico-rango-dias',
      },
      {
        title: 'Rango de Meses',
        link: '/pages/nubosidad/grafico-rango-meses',
      },
      {
        title: 'Rango de Años',
        link: '/pages/nubosidad/grafico-rango-anios',
      }
    ],
  },
  {
    title: 'Horas de Sol',
    icon: 'clock-outline',
    children: [
      {
        title: 'Rango de Dias',
        link: '/pages/horas-sol/grafico-rango-dias',
      },
      {
        title: 'Rango de Meses',
        link: '/pages/horas-sol/grafico-rango-meses',
      },
      {
        title: 'Rango de Años',
        link: '/pages/horas-sol/grafico-rango-anios',
      }
    ],
  },
  {
    title: 'Evaporimetro',
    icon: 'clock-outline',
    children: [
      {
        title: 'Rango de Dias',
        link: '/pages/evaporimetro/grafico-rango-dias',
      },
      {
        title: 'Rango de Meses',
        link: '/pages/evaporimetro/grafico-rango-meses',
      },
      {
        title: 'Rango de Años',
        link: '/pages/evaporimetro/grafico-rango-anios',
      }
    ],
  },
  {
    title: 'Presion Atmosferica',
    icon: 'clock-outline',
    children: [
      {
        title: 'Rango de Dias',
        link: '/pages/presion-atmosferica/grafico-rango-dias',
      },
      {
        title: 'Rango de Meses',
        link: '/pages/presion-atmosferica/grafico-rango-meses',
      },
      {
        title: 'Rango de Años',
        link: '/pages/presion-atmosferica/grafico-rango-anios',
      }
    ],
  },
];
