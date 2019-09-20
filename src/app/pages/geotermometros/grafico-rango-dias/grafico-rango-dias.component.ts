import { Component, OnInit, ViewChild, EventEmitter  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro';
import { Geotermometro } from 'src/app/models/geotermometro';


@Component({
  selector: 'app-grafico-rango-dias',
  templateUrl: './grafico-rango-dias.component.html',
  styleUrls: ['./grafico-rango-dias.component.scss']
})
export class GraficoRangoDiasComponent implements OnInit {

  fechas = [];
  inicioRango = new Date();
  finRango = new Date();
  data = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: '2cm', yAxisID: 'y-axis-1' },
    { data: [], label: '5cm' },
    { data: [], label: '10cm' },
    { data: [], label: '20cm' },
    { data: [], label: '30cm' },
    { data: [], label: '50cm' },
    { data: [], label: '100cm' },
  ];
  public lineChartLabels: Label[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'Jueves',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'Mitad de Semana'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // 2cm
      backgroundColor: 'rgba(0,131,0,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 5cm
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 10cm
      backgroundColor: 'rgba(0,15,255,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // 20cm
      backgroundColor: 'rgba(0,15,255,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // 30cm
      backgroundColor: 'rgba(0,15,255,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // 50cm
      backgroundColor: 'rgba(0,15,255,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // 100cm
      backgroundColor: 'rgba(0,15,255,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(public registroService: RegistroService) { }

  ngOnInit() {
  }

   async selectedDate(event: any){
    
    if(event.end != null){
      this.inicioRango = event.start as Date;
      this.finRango = event.end as Date;
      this.getDataInRange();
    }
  }

  async getDataInRange() {
    var cm2 = [];
    var cm5 = [];
    var cm10 = [];
    var cm20 = [];
    var cm30 = [];
    var cm50 = [];
    var cm100 = [];
    var labels = [];
    while (this.inicioRango.getDate() <= this.finRango.getDate()) {
      var regbyf = new Registro();
      regbyf.fecha = this.inicioRango;
      await this.registroService.getRegistroByFecha(regbyf).subscribe(r => {
        var registro = r.payload as Registro;
        var geotermometro = registro.Geotermometro as Geotermometro;
        var fecha = `${registro.fecha}`;
        cm2.push(geotermometro.cm2);
        cm5.push(geotermometro.cm5);
        cm10.push(geotermometro.cm10);
        cm20.push(geotermometro.cm20);
        cm30.push(geotermometro.cm30);
        cm50.push(geotermometro.cm50);
        cm100.push(geotermometro.cm100);
        labels.push(fecha.substring(0, 10));
        this.viewDataGraphincs(cm2, cm5, cm10, cm20, cm30, cm50, cm100, labels);
      });
      this.inicioRango.setDate((this.inicioRango.getDate() + 1));
    }
  }

  viewDataGraphincs(cm2, cm5, cm10, cm20, cm30, cm50, cm100, labels) {

    this.lineChartLabels = labels;
    for (let i = 0; i < this.lineChartData.length; i++) {
      if (i == 0) {
        this.lineChartData[i].data = cm2;
      }
      if (i == 1) {
        this.lineChartData[i].data = cm5;
      }
      if (i == 2) {
        this.lineChartData[i].data = cm10;
      }
      if (i == 3) {
        this.lineChartData[i].data = cm20;
      }
      if (i == 4) {
        this.lineChartData[i].data = cm30;
      }
      if (i == 5) {
        this.lineChartData[i].data = cm50;
      }
      if (i == 6) {
        this.lineChartData[i].data = cm100;
      }
    }

    this.chart.update();

  }


}
