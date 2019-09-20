import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro';
import { Temperatura } from 'src/app/models/temperatura';

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

  customColumn = 'Fecha';
  defaultColumns = ['Minima', 'Media', 'Maxima'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  source: NbTreeGridDataSource<FSEntry>;


  constructor(dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, public registroService: RegistroService) {
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      childrenGetter: (node: FSEntry) => node.childEntries || undefined,
      expandedGetter: (node: FSEntry) => !!node.expanded,
    };
    this.source = dataSourceBuilder.create(this.data, getters);
  }

  private data: FSEntry[] = [];

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
    var dato : FSEntry;
    var minimas = [];
    var maximas = [];
    var medias = [];
    var labels = [];
    while (this.inicioRango.getDate() <= this.finRango.getDate()) {
      var regbyf = new Registro();
      regbyf.fecha = this.inicioRango;
      await this.registroService.getRegistroByFecha(regbyf).subscribe(r => {
        var registro = r.payload as Registro;
        var tem = registro.Temperatura as Temperatura;
        var fecha = `${registro.fecha}`;
        dato.fecha = fecha;
        dato.minima = tem.minima;
        dato.media = ((tem.minima) + (tem.maxima) / 2);
        dato.maxima = tem.maxima;
        this.data.push(dato);
      });
      this.inicioRango.setDate((this.inicioRango.getDate() + 1));
    }
  }

}
