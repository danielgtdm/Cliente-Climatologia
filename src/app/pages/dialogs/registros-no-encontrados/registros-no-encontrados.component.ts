import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/models/registro';

import { NbDialogRef } from '@nebular/theme';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface FSEntry {
  'Fecha': string;
  'Estado': string;
  childEntries?: FSEntry[];
  expanded?: boolean;
}


@Component({
  selector: 'app-registros-no-encontrados',
  templateUrl: './registros-no-encontrados.component.html',
  styleUrls: ['./registros-no-encontrados.component.scss']
})
export class RegistrosNoEncontradosComponent implements OnInit {

  registros: Registro[];

  customColumn = 'Fecha';
  defaultColumns = ['Estado'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  source: NbTreeGridDataSource<FSEntry>;
  getters: NbGetters<FSEntry, FSEntry> = {
    dataGetter: (node: FSEntry) => node,
    childrenGetter: (node: FSEntry) => node.childEntries || undefined,
    expandedGetter: (node: FSEntry) => !!node.expanded,
  };

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    protected dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit() {
    var data: FSEntry[] = [];
    
    for (let index = 0; index < this.registros.length; index++) {
      const registro = this.registros[index];

      data.push({
        'Fecha': registro.fecha.toString().substring(0, 15),
        'Estado': 'No Registrado'
      });
      
    }
    
    this.source = this.dataSourceBuilder.create(data, this.getters);
  }

  close(){
    this.dialogRef.close();
  }

}
