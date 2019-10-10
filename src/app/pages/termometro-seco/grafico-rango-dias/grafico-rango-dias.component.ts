import { Component, OnInit, ViewChild, EventEmitter  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro';
import { TermometroSeco } from 'src/app/models/termometro-seco';

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
    { data: [], label: '08:30 hrs', yAxisID: 'y-axis-1' },
    { data: [], label: '14:00 hrs' },
    { data: [], label: '18:00 hrs' }
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
    { // media
      backgroundColor: 'rgba(0,131,0,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // maxima
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // minima
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

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

   async selectedDate(event: any){
    
    if(event.end != null){
      this.inicioRango = event.start as Date;
      this.finRango = event.end as Date;
      this.getDataInRange();
    }
  }

  async getDataInRange() {
    var h0830 = [];
    var h1400 = [];
    var h1800 = [];
    var labels = [];
    while (this.inicioRango.getDate() <= this.finRango.getDate()) {
      var regbyf = new Registro();
      regbyf.fecha = this.inicioRango;
      await this.registroService.getRegistroByFecha(regbyf).subscribe(r => {
        var registro = r.payload as Registro;
        var ts = registro.TermometroSeco as TermometroSeco;
        var fecha = `${registro.fecha}`;
        h0830.push(ts.h0830);
        h1400.push(ts.h1400);
        h1800.push(ts.h1800);
        labels.push(fecha.substring(0, 10));
        this.viewDataGraphincs(h0830, h1400, h1800, labels);
      });
      this.inicioRango.setDate((this.inicioRango.getDate() + 1));
    }
  }

  viewDataGraphincs(h0830, h1400, h1800, labels) {

    this.lineChartLabels = labels;
    for (let i = 0; i < this.lineChartData.length; i++) {
      if (i == 0) {
        this.lineChartData[i].data = h0830;
      }
      if (i == 1) {
        this.lineChartData[i].data = h1400;
      }
      if (i == 2) {
        this.lineChartData[i].data = h1800;
      }
    }

    this.chart.update();

  }


}
