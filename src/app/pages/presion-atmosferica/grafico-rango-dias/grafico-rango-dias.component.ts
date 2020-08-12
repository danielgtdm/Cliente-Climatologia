import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro';
import { PresionAtmosferica } from 'src/app/models/presion-atmosferica';

import { NbDialogService } from '@nebular/theme';
import { ConsultandoComponent } from 'src/app/pages/dialogs/consultando/consultando.component';
import { RegistrosNoEncontradosComponent } from 'src/app/pages/dialogs/registros-no-encontrados/registros-no-encontrados.component';

@Component({
  selector: 'app-grafico-rango-dias',
  templateUrl: './grafico-rango-dias.component.html',
  styleUrls: ['./grafico-rango-dias.component.scss']
})
export class GraficoRangoDiasComponent implements OnInit {

  private fechas = [];
  private inicioRango = new Date();
  private finRango = new Date();
  private data = [];
  private fechaBuscar = new Date();
  private listaRegistros = [];
  private registrosNoEncontrados: Registro[] = [];
  private dialogoConsulta;

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
    { // 08:30 hrs
      backgroundColor: 'rgba(0,131,0,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 14:00 hrs
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 18:00 hrs
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

  constructor(
    public registroService: RegistroService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  private getDateList(){
    this.fechas = new Array();
    var aux = this.inicioRango;
    this.fechas.push([new Date(+aux)]);

    do{
      aux.setDate(aux.getDate() + 1);
      this.fechas.push([new Date(+aux)]);
    }while(aux < this.finRango)

    return this.fechas;
  }

  async selectedDate(event: any) {

    if (event.end != null) {
      this.dialogoConsulta = this.dialogService.open(ConsultandoComponent);
      this.inicioRango = event.start as Date;
      this.finRango = event.end as Date;
      this.getDataInRange();
    }
  }
  
  async getDataInRange() {
    this.registrosNoEncontrados = [];
    this.listaRegistros = [];
    const lista = this.getDateList();

    for (let i = 0; i < lista.length; i++){
      const day = lista[i] as Date;
      let reg = new Registro();
      reg.fecha = day;
      const promesa = await this.registroService.getRegistroByFecha(reg).toPromise()
      .catch(err => {
	//handle errors
      });

      promesa ? 
	this.listaRegistros.push(promesa.payload as Registro) : this.registrosNoEncontrados.push(reg);
    }
    this.viewDataGraphics(this.listaRegistros);
  }


  private viewDataGraphics(listaRegistros: Registro[]) {
    const registros = listaRegistros;
    let h0830 = [];
    let h1400 = [];
    let h1800 = [];
    let labels = [];

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      const pa = registro.PresionAtmosferica as PresionAtmosferica;
      const fecha = `${registro.fecha}`;
      h0830.push(pa.h0830);
      h1400.push(pa.h1400);
      h1800.push(pa.h1800);
      labels.push(fecha.substring(0, 10));
    }

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
    this.dialogoConsulta.close();

    this.registrosNoEncontrados.length > 0 ? 
      this.dialogoRegistrosNoEncontrados() : ()=>{} ;
  }

  private dialogoRegistrosNoEncontrados(){
    this.dialogService.open(RegistrosNoEncontradosComponent, { context: { registros: this.registrosNoEncontrados}});
  }


}
