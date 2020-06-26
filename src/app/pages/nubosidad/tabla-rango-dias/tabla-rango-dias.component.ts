import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

import { Registro } from 'src/app/models/registro';
import { Nubosidad } from 'src/app/models/nubosidad';

import { RegistroService } from 'src/app/services/registro.service';
import { ExcelService} from 'src/app/services/excel.service';
import { CsvService } from 'src/app/services/csv.service';

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

  public exportarCSV() {
    if(this.listaRegistros.length == 0){
      alert('Primero debes seleccionar un rango de fechas');
    }else{
      this.csvService.generateNubosidadCSV(this.listaRegistros);
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

      const nubosidad = registro.Nubosidad;
      const fecha = registro.fecha ?
        registro.fecha.toString().substring(0, 10) : 'Fecha No Registrada';

      data.push({
        'Fecha': fecha,
        '08:30 hrs': nubosidad.h0830 != null ? `${nubosidad.h0830}` : 'No Registrado',
        '14:00 hrs': nubosidad.h1400 != null ? `${nubosidad.h1400}` : 'No Registrado',
        '18:00 hrs': nubosidad.h1800 != null ? `${nubosidad.h1800}` : 'No Registrado'
      });
    }

    this.source = this.dataSourceBuilder.create(data, this.getters);
  }

  private registroNoEncontrado() : Registro {
    var registroNoEncontrado = new Registro();
    registroNoEncontrado.Nubosidad = new Nubosidad();

    return registroNoEncontrado;
  }

}