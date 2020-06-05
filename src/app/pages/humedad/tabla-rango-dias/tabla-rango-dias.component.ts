import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro';
import { TermometroHumedo } from 'src/app/models/termometro-humedo';
import { TermometroSeco } from 'src/app/models/termometro-seco';
import { PresionAtmosferica } from 'src/app/models/presion-atmosferica';

interface FSEntry {
  'Fecha': string;
  '08:30 hrs': number;
  '14:00 hrs': number;
  '18:00 hrs': number;
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
  listaRegistros = [];

  customColumn = 'Fecha';
  defaultColumns = ['08:30 hrs', '14:00 hrs', '18:00 hrs'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  cast: NbTreeGridDataSourceBuilder<FSEntry>;
  source: NbTreeGridDataSource<FSEntry>;
  getters: NbGetters<FSEntry, FSEntry>;
  

  constructor(dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, public registroService: RegistroService) {
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

  updateTable(listaRegistros: Registro[]) {
    
    //Limpiar tabla en caso de elegir otro rango
    this.data = this.dataClean; 
  
    var registros = listaRegistros;
    var aux_reg = new Registro();
  
    //extraer datos
    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      var th = registro.TermometroHumedo as TermometroHumedo;
      var ts = registro.TermometroSeco as TermometroSeco;
      var pa = registro.PresionAtmosferica as PresionAtmosferica;
      var fecha = `${registro.fecha.toString().substring(0, 10)}`;
      var dato: FSEntry = {
        'Fecha': fecha,
        '08:30 hrs': this.getHumedadRelativa(th.h0830, ts.h0830, pa.h0830),
        '14:00 hrs': this.getHumedadRelativa(th.h1400, ts.h1400, pa.h1400),
        '18:00 hrs': this.getHumedadRelativa(th.h1800, ts.h1800, pa.h1800),
        childEntries: []     
      };
      this.data.push(dato);
    }
  
    //reconstruir tabla
    this.source = this.cast.create(this.data, this.getters);
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

    this.updateTable(this.listaRegistros);        
  }

  getHumedadRelativa(th, ts, pa) {
    var humedadRelativa;

    humedadRelativa = 100 * ((6.11 * Math.pow(10, ((7.5 * th) / (th + 237.3)))) - (0.5 * pa * (ts - th) / 755)) / (6.11 * Math.pow(10, ((7.5 * ts) / (ts + 237.3))));

    return Math.round(humedadRelativa * 100) / 100; //Obtener redondeo a 2 decimales
  }



}





