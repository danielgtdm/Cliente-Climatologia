import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
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
  fechaBuscar = new Date();
  listaRegistros = [];

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

  async selectedDate(event: any) {

    if (event.end != null) {
      this.inicioRango = event.start as Date;
      this.finRango = event.end as Date;
      this.getDataInRange();
    }
  }


  async getDataInRange() {

    this.fechaBuscar = this.inicioRango;
    while (this.fechaBuscar.getDate() <= this.finRango.getDate()) {
      var regbyf = new Registro();
      regbyf.fecha = this.fechaBuscar;
      this.registroService.getRegistroByFecha(regbyf).subscribe(r => {
        var registro = r.payload as Registro;
        this.listaRegistros.push(registro);
        this.viewDataGraphincs(this.listaRegistros);
      });
      this.fechaBuscar.setDate((this.fechaBuscar.getDate() + 1));
    }
  }

  viewDataGraphincs(listaRegistros: Registro[]) {
    var registros = listaRegistros;
    var aux_reg = new Registro();
    var minimas = [];
    var maximas = [];
    var medias = [];
    var labels = [];
    console.log("Tamaño de la lista: " + registros.length);
    for (let i = 0; i < registros.length; i++) {
      for (let j = 0; j < registros.length -1; j++) {

          var reg1 = registros[j] as Registro;
          var reg2 = registros[j+1] as Registro;
          console.log("fecha de reg 1: " + reg1.fecha);
          console.log("fecha de reg 2: " + reg2.fecha);
          var nuevo = new Date(reg1.fecha);
          console.log("la fecha casteada es: " + nuevo.getDate());
        if (registros[j].fecha.getDate() < registros[j+1].fecha.getDate()) {
          aux_reg = registros[j];
          registros[j] = registros[j+1];
          registros[j+1] = aux_reg;
        }
      }
    }

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      var tem = registro.Temperatura as Temperatura;
      var fecha = `${registro.fecha}`;
      minimas.push(tem.minima);
      maximas.push(tem.maxima);
      medias.push(((tem.minima) + (tem.maxima) / 2));
      labels.push(fecha.substring(0, 10));
    }

    this.lineChartLabels = labels;
    for (let i = 0; i < this.lineChartData.length; i++) {
      if (i == 0) {
        this.lineChartData[i].data = medias;
      }
      if (i == 1) {
        this.lineChartData[i].data = maximas;
      }
      if (i == 2) {
        this.lineChartData[i].data = minimas;
      }
    }

    this.chart.update();

  }


}
