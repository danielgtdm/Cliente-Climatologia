import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { Registro } from 'src/app/models/registro';

@Injectable({
  providedIn: 'root'
})



export class CsvService {

  constructor() { }

  generateCSV(registros: Registro[]){
    var data = [];
    for (let index = 0; index < registros.length; index++) {
      const reg = registros[index];
      const tem = reg.Temperatura;

      const fecha = reg.fecha.toString().substring(0, 10);
      const minima = tem.minima;
      const maxima = tem.maxima;
      const media = ((tem.minima + tem.maxima)/2);

      data.push({
        Fecha: fecha,
        Minima: minima,
        Media: media,
        Maxima: maxima
      });
    }

    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Climatologia Matthei',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);

  }

}
