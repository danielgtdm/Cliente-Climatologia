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
        title: 'Gráfico',
        link: '/pages/temperaturas/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/temperaturas/tabla-rango-dias',
      }     
    ]
  },

  {
    title: 'Humedad',
    icon: 'percent-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/humedad/grafico-rango-dias'

      },
      {
        title: 'Tabla',
        link: '/pages/humedad/tabla-rango-dias',
      }
    ]
  },

  {
    title: 'Precipitación',
    icon: 'droplet-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/precipitacion/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/precipitacion/tabla-rango-dias',
      }
    ]
  },

  {
    title: 'Nubosidad',
    icon: 'cloud-upload-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/nubosidad/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/nubosidad/tabla-rango-dias',
      }
    ]
  },

  {
    title: 'Horas de Sol',
    icon: 'clock-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/horas-sol/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/horas-sol/tabla-rango-dias'
      }
    ]
  },

  {
    title: 'Evaporimetro',
    icon: 'clock-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/evaporimetro/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/evaporimetro/tabla-rango-dias'
      }
    ]
  },

  {
    title: 'Presion Atmosferica',
    icon: 'clock-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/presion-atmosferica/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/presion-atmosferica/tabla-rango-dias'
      }
    ]
  },

  {
    title: 'Visibilidad',
    icon: 'clock-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/visibilidad/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/visibilidad/tabla-rango-dias'
      }
    ]
  },

  {
    title: 'Geotermometros',
    icon: 'clock-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/geotermometros/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/geotermometros/tabla-rango-dias'
      }
    ]
  },

  {
    title: 'Termometro Seco',
    icon: 'clock-outline',
    children: [
      {
        title: 'Gráfico',
        link: '/pages/termometro-seco/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/termometro-seco/tabla-rango-dias'
      }
    ]
  },

  {
    title: 'Termometro Humedo',
    icon: 'clock-outline',
    children: [
      {
        title: 'Grafico',
        link: '/pages/termometro-humedo/grafico-rango-dias'
      },
      {
        title: 'Tabla',
        link: '/pages/termometro-humedo/tabla-rango-dias'
      }
    ]
  }
  
];
