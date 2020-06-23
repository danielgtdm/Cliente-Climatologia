import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';

import { Registro } from 'src/app/models/registro';

@Injectable({
  providedIn: 'root'
})



export class CsvService {

  private options = { 
    fieldSeparator: ',',
    filename: '',
    title: '',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  constructor() { }

  public generateTemperaturaCSV(registros: Registro[]){
    var data = [];
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const temperatura = registro.Temperatura;
      const fecha = registro.fecha ?
        registro.fecha.toString().substring(0, 10) : 'Fecha No Registrada';  

      data.push({
        'Fecha': fecha,
        'Minima': temperatura.minima != null ? temperatura.minima : 'No Registrado',
        'Maxima': temperatura.maxima != null ? temperatura.maxima : 'No Registrado',
        'Media': temperatura.minima != null && temperatura.maxima != null ?
          ((temperatura.minima + temperatura.maxima)/2) : 'No Calculado'
      });
    }

    this.options.filename = 'Temperatura_Estacion_Matthei';
    this.options.title = 'Temperatura Climatologia Matthei';

    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(data);

  }

  public generateHumedadCSV(registros: Registro[]){
    var data = [];
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const termometroHumedo = registro.TermometroHumedo;
      const termometroSeco = registro.TermometroSeco;
      const presionAtmosferica = registro.PresionAtmosferica;
      const fecha = registro.fecha ?
        registro.fecha.toString().substring(0, 10) : 'Fecha No Registrada';

        data.push({
          'Fecha': fecha,
          '08:30 hrs': termometroHumedo.h0830 != null && termometroSeco.h0830 != null && presionAtmosferica.h0830 != null ?
            this.getHumedadRelativa(termometroHumedo.h0830, termometroSeco.h0830, presionAtmosferica.h0830) : 'No Calculado',
          '14:00 hrs': termometroHumedo.h1400 != null && termometroSeco.h1400 != null && presionAtmosferica.h1400 != null ?
            this.getHumedadRelativa(termometroHumedo.h1400, termometroSeco.h1400, presionAtmosferica.h1400) : 'No Calculado',
          '18:00 hrs': termometroHumedo.h1800 != null && termometroSeco.h1800 != null && presionAtmosferica.h1800 != null ?
            this.getHumedadRelativa(termometroHumedo.h1800, termometroSeco.h1800, presionAtmosferica.h1800) : 'No Calculado'
        });
    }

    this.options.filename = 'Humedad_Estacion_Matthei';
    this.options.title = 'Humedad Climatologia Matthei';

    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(data);

  }

  public generateNubosidadCSV(registros: Registro[]){
    var data = [];
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const nubosidad = registro.Nubosidad;
      const fecha = registro.fecha ?
        registro.fecha.toString().substring(0, 10) : 'Fecha No Registrada';  

      data.push({
        'Fecha': fecha,
        '08:30 hrs': nubosidad.h0830 != null ? nubosidad.h0830 : 'No Registrado',
        '14:00 hrs': nubosidad.h1400 != null ? nubosidad.h1400 : 'No Registrado',
        '18:00 hrs': nubosidad.h1800 != null ? nubosidad.h1800 : 'No Registrado'
      });
    }

    this.options.filename = 'Nubosidad_Estacion_Matthei';
    this.options.title = 'Nubosidad Climatologia Matthei';

    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(data);

  }

  private getHumedadRelativa(th: number, ts: number, pa: number): number {
    var humedadRelativa : number;

    humedadRelativa = 100 * ((6.11 * Math.pow(10, ((7.5 * th) / (th + 237.3)))) - (0.5 * pa * (ts - th) / 755)) / (6.11 * Math.pow(10, ((7.5 * ts) / (ts + 237.3))));

    return Math.round(humedadRelativa * 100) / 100; //Obtener redondeo a 2 decimales
  }

}
