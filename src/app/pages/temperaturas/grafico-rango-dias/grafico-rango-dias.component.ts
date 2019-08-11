import { Component, OnInit, ViewChild, EventEmitter  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro';
import { Temperatura } from 'src/app/models/temperatura';

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
    { data: [], label: 'Medias', yAxisID: 'y-axis-1' },
    { data: [], label: 'Maximas' },
    { data: [], label: 'Minimas' }
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

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

   async selectedDate(event: any){
    // alert("Haz Seleccionado un Rango de Fechas");
    console.log("Se ha capturado el elvento");

    // await this.fechas.push(event);
    // console.log(event.start);
    if(event.end != null){
      // console.log(event.end);
      await this.fechas.push(event.start as Date);
      await this.fechas.push(event.end as Date);
      console.log("La fecha de Inicio es: " + this.fechas[0]);
      console.log("La fecha de Fin es: " + this.fechas[1]);
    }
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }


}
