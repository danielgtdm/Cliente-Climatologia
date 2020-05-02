import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro';
import { Temperatura } from 'src/app/models/temperatura';

import { ExcelService } from 'src/app/services/excel.service';

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

  fechas = [];
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

  constructor(dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, public registroService: RegistroService, public excelService: ExcelService) {
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


  exportar(){
    this.excelService.generateExcel(this.listaRegistros);
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
    while(this.fechaBuscar.getDate() <= this.finRango.getDate()) {
      var regbyf = new Registro();
      regbyf.fecha = this.fechaBuscar;
      this.registroService.getRegistroByFecha(regbyf).subscribe(r => {
        var registro = r.payload as Registro;
        this.listaRegistros.push(registro);
        this.viewDataTable(this.listaRegistros);
      });
      this.fechaBuscar.setDate((this.fechaBuscar.getDate() + 1));
    }
  }

  viewDataTable(listaRegistros: Registro[]){
    var registros = listaRegistros;
    var aux_reg = new Registro();
    var data: FSEntry[] = [];

    for (let i = 0; i < registros.length; i++) {
      for (let j = 0; j < registros.length - 1; j++) {
        var reg1 = registros[j] as Registro;
        var reg2 = registros[j +1] as Registro;
        if(reg1.fecha > reg2.fecha){
          aux_reg = registros[j];
          registros[j] = registros[j + 1];
          registros[j + 1] = aux_reg;
        }        
      }      
    }

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      var tem = registro.Temperatura as Temperatura;
      var fecha = `${registro.fecha.toString().substring(0, 10)}`;
      var minima = tem.minima;
      var maxima = tem.maxima;
      var media = ((tem.minima + tem.maxima)/2);
      data.push({
        fecha: fecha,
        minima: minima,
        media: media,
        maxima: maxima
      });
    }

    this.source = this.cast.create(data, this.getters);

  }


}