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
  datos = [];
  listaRegistros: Registro[] = [];
  vac: Registro[] = [];

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

  private data: FSEntry[] = [];
  private dataClean: FSEntry[] = [];

  ngOnInit() {
  }

  exportar(){
    this.excelService.generateExcel(this.listaRegistros);
  }

  updateTable(listaRegistros: Registro[]) {

    this.data = this.dataClean;

    var registros = listaRegistros;
    var aux_reg = new Registro();

    for (let i = 0; i < registros.length; i++) {
      for (let j = 0; j < registros.length - 1; j++) {
        var reg1 = registros[j] as Registro;
        var reg2 = registros[j + 1] as Registro;
        if (reg1.fecha > reg2.fecha) {
          aux_reg = registros[j];
          registros[j] = registros[j + 1];
          registros[j + 1] = aux_reg;
        }
      }
    }

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      var tem = registro.Temperatura as Temperatura;
      var fecha = `${registro.fecha}`;
      var sumadas = tem.minima + tem.maxima;
      var media = sumadas / 2;
      var dato: FSEntry = {
        fecha: fecha,
        minima: tem.minima,
        media: media,
        maxima: tem.maxima,
        childEntries: []
      };
      this.data.push(dato);
    }

    this.source = this.cast.create(this.data, this.getters);
  }

  async selectedDate(event: any) {

    if (event.end != null) {
      this.inicioRango = event.start as Date;
      this.finRango = event.end as Date;
      this.listaRegistros = this.vac;
      this.fechas = [];

      this.ordenarFechas();
      this.getDataInRange();
    }

  }

  ordenarFechas(){
    const cantidad = this.finRango.getDate() - this.inicioRango.getDate();
    for (let i = 0; i < cantidad; i++) {
      var fecha = this.inicioRango;
      fecha.setDate(this.inicioRango.getDate() + i);
      this.fechas.push(fecha);
    }
  }

  getDataInRange() {
    for (let index = 0; index < this.fechas.length; index++) {
      const fecha = this.fechas[index];
      var regbyf = new Registro();
      regbyf.fecha = fecha;
      this.registroService.getRegistroByFecha(regbyf).subscribe(r => {
        var registro = r.payload as Registro;
        this.listaRegistros.push(registro);
        this.updateTable(this.listaRegistros);
      });
    }
  }

}