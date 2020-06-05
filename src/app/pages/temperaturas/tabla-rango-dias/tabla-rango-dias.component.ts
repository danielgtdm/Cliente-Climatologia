import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro';
import { Temperatura } from 'src/app/models/temperatura';

import { ExcelService } from 'src/app/services/excel.service';
import { CsvService } from 'src/app/services/csv.service';

interface FSEntry {
  fecha: string;
  minima: number;
  media: number;
  maxima: number;
  childEntries?: FSEntry[];
  expanded?: boolean;
}

@Component({
  selector: 'app-tabla-rango-dias',
  templateUrl: './tabla-rango-dias.component.html',
  styleUrls: ['./tabla-rango-dias.component.scss']
})
export class TablaRangoDiasComponent implements OnInit {

  fechas = new Array();
  inicioRango = new Date();
  finRango = new Date();
  data = [];
  fechaBuscar = new Date();
  listaRegistros: Registro[] = [];

  customColumn = 'fecha';
  defaultColumns = ['minima', 'media', 'maxima'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  cast: NbTreeGridDataSourceBuilder<FSEntry>;
  source: NbTreeGridDataSource<FSEntry>;
  getters: NbGetters<FSEntry, FSEntry>;

  constructor(
    dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    public registroService: RegistroService,
    public excelService: ExcelService,
    public csvService: CsvService
  ) {
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      childrenGetter: (node: FSEntry) => node.childEntries || undefined,
      expandedGetter: (node: FSEntry) => !!node.expanded,
    };
    this.source = dataSourceBuilder.create(this.data, getters);
    this.cast = dataSourceBuilder;
    this.getters = getters;
  }


  ngOnInit() {
  }

  getDateList(){
    this.fechas = new Array();
    var aux = this.inicioRango;
    this.fechas.push([new Date(+aux)]);

    do{
      aux.setDate(aux.getDate() + 1);
      this.fechas.push([new Date(+aux)]);
    }while(aux < this.finRango)

    return this.fechas;
  }

  exportarExcel() {
    if(this.listaRegistros.length == 0){
      alert('Primero debes seleccionar un rango de fechas');
    }else{
      this.excelService.generateExcel(this.listaRegistros);
    }
  }

  exportarCSV() {
    if(this.listaRegistros.length == 0){
      alert('Primero debes seleccionar un rango de fechas');
    }else{
      this.csvService.generateCSV(this.listaRegistros);
    }
  }


  selectedDate(event: any) {

    if (event.end != null) {
      this.inicioRango = event.start as Date;
      this.finRango = event.end as Date;
      this.getDataInRange();
    }

  }

  async getDataInRange() {
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
        this.listaRegistros.push(promesa.payload as Registro) : console.log('No se encuentra la fecha: ' + day)   
    }

    this.viewDataTable(this.listaRegistros);
  }

  viewDataTable(listaRegistros: Registro[]) {
    var registros = listaRegistros;
    var data: FSEntry[] = [];

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      var tem = registro.Temperatura as Temperatura;
      var fecha = `${registro.fecha.toString().substring(0, 10)}`;
      var minima = tem.minima;
      var maxima = tem.maxima;
      var media = ((tem.minima + tem.maxima) / 2);
      data.push({
        fecha: fecha,
        minima: minima,
        media: media,
        maxima: maxima
      });
    }

    this.listaRegistros = registros;
    this.source = this.cast.create(data, this.getters);
  }


}