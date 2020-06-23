import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

import { Registro } from 'src/app/models/registro';
import { TermometroHumedo } from 'src/app/models/termometro-humedo';
import { TermometroSeco } from 'src/app/models/termometro-seco';
import { PresionAtmosferica } from 'src/app/models/presion-atmosferica';

import { RegistroService } from 'src/app/services/registro.service';
import { CsvService } from 'src/app/services/csv.service';
import { ExcelService } from 'src/app/services/excel.service';

interface FSEntry {
  'Fecha': string;
  '08:30 hrs': string;
  '14:00 hrs': string;
  '18:00 hrs': string;
  childEntries?: FSEntry[];
  expanded?: boolean;
}

@Component({
  selector: 'app-tabla-rango-dias',
  templateUrl: './tabla-rango-dias.component.html',
  styleUrls: ['./tabla-rango-dias.component.scss']
})
export class TablaRangoDiasComponent implements OnInit {
  
  private fechas = new Array();
  private inicioRango = new Date();
  private finRango = new Date();
  private listaRegistros: Registro[] = [];

  customColumn = 'Fecha';
  defaultColumns = ['08:30 hrs', '14:00 hrs', '18:00 hrs'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  source: NbTreeGridDataSource<FSEntry>;
  getters: NbGetters<FSEntry, FSEntry> = {
    dataGetter: (node: FSEntry) => node,
    childrenGetter: (node: FSEntry) => node.childEntries || undefined,
    expandedGetter: (node: FSEntry) => !!node.expanded,
  };

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private dialogService: NbDialogService, 
    private registroService: RegistroService,
    private excelService: ExcelService,
    private csvService: CsvService
    ) {
    this.source = dataSourceBuilder.create([], this.getters);
  }
  
  ngOnInit() {
  }

  private getDateList() {
    this.fechas = new Array();
    var aux = this.inicioRango;
    this.fechas.push([new Date(+aux)]);

    do{
      aux.setDate(aux.getDate() + 1);
      this.fechas.push([new Date(+aux)]);
    }while(aux < this.finRango)

    return this.fechas;
  }

  public exportarExcel() {
    if(this.listaRegistros.length == 0){
      alert('Primero debes seleccionar un rango de fechas');
    }else{
      //this.excelService.generateNubosidadExcel(this.listaRegistros);
    }
  }

  public exportarHumedadCSV() {
    if(this.listaRegistros.length == 0){
      alert('Primero debes seleccionar un rango de fechas');
    }else{
      this.csvService.generateHumedadCSV(this.listaRegistros);
    }
  }

  public selectedDate(event: any) {

    if (event.end != null) {
      this.inicioRango = event.start as Date;
      this.finRango = event.end as Date;
      this.getDataInRange();
    }

  }

  private async getDataInRange() {
    this.listaRegistros = [];
    var lista = this.getDateList();

    for (let i = 0; i < lista.length; i++) {
      const day = lista[i] as Date;
      var reg = new Registro();
      reg.fecha = day;
      var promesa = await this.registroService.getRegistroByFecha(reg).toPromise()
      .catch(err => {
        alert( 'No se ha encontrado la fecha ' + day.toString().substring(0, 15));
      });

      promesa ? 
        this.listaRegistros.push(promesa.payload as Registro) : this.listaRegistros.push(this.registroNoEncontrado());
    }

    this.viewDataTable(this.listaRegistros);
  }

  private viewDataTable(listaRegistros: Registro[]) {
    const registros = listaRegistros;
    var data: FSEntry[] = []; 

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];

      const termometroHumedo = registro.TermometroHumedo;
      const termometroSeco = registro.TermometroSeco;
      const presionAtmosferica = registro.PresionAtmosferica;
      const fecha = registro.fecha ?
        registro.fecha.toString().substring(0, 10) : 'Fecha No Registrada';

      data.push({
        'Fecha': fecha,
        '08:30 hrs': termometroHumedo.h0830 != null && termometroSeco.h0830 != null && presionAtmosferica.h0830 != null ?
          `${this.getHumedadRelativa(termometroHumedo.h0830, termometroSeco.h0830, presionAtmosferica.h0830)}` : 'No Calculado',
        '14:00 hrs': termometroHumedo.h1400 != null && termometroSeco.h1400 != null && presionAtmosferica.h1400 != null ?
          `${this.getHumedadRelativa(termometroHumedo.h1400, termometroSeco.h1400, presionAtmosferica.h1400)}` : 'No Calculado',
        '18:00 hrs': termometroHumedo.h1800 != null && termometroSeco.h1800 != null && presionAtmosferica.h1800 != null ?
          `${this.getHumedadRelativa(termometroHumedo.h1800, termometroSeco.h1800, presionAtmosferica.h1800)}` : 'No Calculado'
      });
    }
  
    this.source = this.dataSourceBuilder.create(data, this.getters);
  }

  private getHumedadRelativa(th: number, ts: number, pa: number): number {
    var humedadRelativa : number;

    humedadRelativa = 100 * ((6.11 * Math.pow(10, ((7.5 * th) / (th + 237.3)))) - (0.5 * pa * (ts - th) / 755)) / (6.11 * Math.pow(10, ((7.5 * ts) / (ts + 237.3))));

    return Math.round(humedadRelativa * 100) / 100; //Obtener redondeo a 2 decimales
  }

  private registroNoEncontrado() : Registro {
    var registroNoEncontrado = new Registro();
    registroNoEncontrado.TermometroHumedo = new TermometroHumedo();
    registroNoEncontrado.TermometroSeco = new TermometroSeco();
    registroNoEncontrado.PresionAtmosferica = new PresionAtmosferica();

    return registroNoEncontrado;
  }

}





