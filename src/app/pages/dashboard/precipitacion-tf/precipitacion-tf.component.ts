import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, BaseChartDirective } from 'ng2-charts';

import { RegistroService } from 'src/app/services/registro.service';

import { Registro } from 'src/app/models/registro';

@Component({
  selector: 'app-precipitacion-tf',
  templateUrl: './precipitacion-tf.component.html',
  styleUrls: ['./precipitacion-tf.component.scss']
})
export class PrecipitacionTfComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    maintainAspectRatio: false
  };
  public barChartLabels: Label[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    private dialogService: NbDialogService,
    private http: HttpClient,
    private registroService: RegistroService
  ) {

  }

  ngOnInit() {
    const dates: Date[] = this.dateSelection();
    const registros = this.getData(dates);
  }

  private dateSelection(): Date[] {
    let dates: Date[] = [];
    const today = new Date();

    for (let index = 0; index < 7; index++) {
      let day = new Date();
      day.setDate(day.getDate() - index);
      dates.push(day);
    }
    return dates;
  }

  private async getData(dates: Date[]) {
    let registros: Registro[] = [];

    for (let index = 0; index < dates.length; index++) {
      const date = dates[index];
      let registroBuscar = new Registro();
      registroBuscar.fecha = date;
      const promesa = await this.registroService.getRegistroByFecha(registroBuscar).toPromise();
      promesa ?
        registros.push(promesa.payload as Registro) : () => { };
    }

    let agua_caida = [];
    let ChartLabels = [];
    registros.forEach(registro => {
      ChartLabels.push(registro.fecha.toString().substring(0, 10));
      const agua = registro.agua_caida;
      agua_caida.push(agua);
    });
    this.barChartLabels = ChartLabels;
    this.barChartData = [
      { data: agua_caida, label: 'Agua Caida' }
    ]
  }

}
