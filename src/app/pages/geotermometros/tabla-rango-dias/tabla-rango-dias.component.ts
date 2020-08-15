import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

import { RegistroService } from 'src/app/services/registro.service';
import { NbDialogService, } from '@nebular/theme';
import { ConsultandoComponent } from 'src/app/pages/dialogs/consultando/consultando.component';
import { RegistrosNoEncontradosComponent } from 'src/app/pages/dialogs/registros-no-encontrados/registros-no-encontrados.component';

import { Registro } from 'src/app/models/registro';
import { Geotermometro } from 'src/app/models/geotermometro';

import { CsvService } from 'src/app/services/csv.service';
import { ExcelService } from 'src/app/services/excel.service';

interface FSEntry {
  'Fecha' : string;
  '2cm' : number | string;
  '5cm' : number | string;
  '10cm' : number | string;
  '20cm' : number | string;
  '30cm' : number | string;
  '50cm' : number | string;
  '100cm' : number | string;
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
  private registrosNoEncontrados: Registro[] = [];
  private dialogoConsulta;
 
  customColumn = 'Fecha';
  defaultColumns = ['2cm', '5cm', '10cm', '20cm', '30cm', '50cm', '100cm'];
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
      this.excelService.generateGeotermometroExcel(this.listaRegistros);
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
      this.dialogoConsulta = this.dialogService.open(ConsultandoComponent);
      this.inicioRango = event.start as Date;
      this.finRango = event.end as Date;
      this.getDataInRange();
    }

  }

  private async getDataInRange() {
    this.listaRegistros = [];
    this.registrosNoEncontrados = [];
    var lista = this.getDateList();

    for (let i = 0; i < lista.length; i++) {
      const day = lista[i] as Date;
      var reg = new Registro();
      reg.fecha = day;
      var promesa = await this.registroService.getRegistroByFecha(reg).toPromise()
      .catch(err => {
      });

      promesa ? 
        this.listaRegistros.push(promesa.payload as Registro) : this.listaRegistros.push(this.registroNoEncontrado(reg));
    }

    this.viewDataTable(this.listaRegistros);
  }

  private viewDataTable(listaRegistros: Registro[]) {
    const registros = listaRegistros;
    var data: FSEntry[] = [];

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];

      const gt = registro.Geotermometro;
      const fecha = registro.fecha ?
        registro.fecha.toString().substring(0, 10) : 'Fecha No Registrada';

      data.push({
        'Fecha': fecha,
        '2cm': gt.cm2 != null ? gt.cm2 : 'No Registrado',
        '5cm': gt.cm5 != null ? gt.cm5 : 'No Registrado',
        '10cm': gt.cm10 != null ? gt.cm10 : 'No Registrado',
        '20cm': gt.cm20 != null ? gt.cm20 : 'No Registrado',
        '30cm': gt.cm30 != null ? gt.cm30 : 'No Registrado',
        '50cm': gt.cm50 != null ? gt.cm50 : 'No Registrado',
        '100cm': gt.cm100 != null ? gt.cm100 : 'No Registrado',
      });
    }

    this.source = this.dataSourceBuilder.create(data, this.getters);
    this.dialogoConsulta.close();
    this.registrosNoEncontrados.length > 0 ? this.dialogoRegistrosNoEncontrados() : ()=>{} ;
  }

  private registroNoEncontrado(reg: Registro) : Registro {
    this.registrosNoEncontrados.push(reg);
    var registroNoEncontrado = new Registro();
    registroNoEncontrado.Geotermometro = new Geotermometro();

    return registroNoEncontrado;
  }

  private dialogoRegistrosNoEncontrados(){
    this.dialogService.open(RegistrosNoEncontradosComponent, {context: { registros: this.registrosNoEncontrados}});
  }

}
