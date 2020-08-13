import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import { Registro } from 'src/app/models/registro';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(
    private http: HttpClient
  ) { }


  public generateTemperaturaExcel(registros: Registro[]) {

    const title = "Temperatura Climatologia Matthei";
    const header = "TEMPERATURAS";
    let data = [];
    data.push(["Fecha", "Minima", "Maxima", "Media"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const temperatura = registro.Temperatura;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        temperatura.minima != null ? temperatura.minima : 'No Registrado',
        temperatura.maxima != null ? temperatura.maxima : 'No Registrado',
        temperatura.minima != null && temperatura.maxima != null ? 
          ((temperatura.minima + temperatura.maxima)/2) : 'No Calculado'
      ]);
      
    }
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Estacion");

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Calibri', family: 4, size: 16}
    worksheet.addRow([]);
    const subtitleRow = worksheet.addRow([]);

    const headerRow = worksheet.addRow([header]);
    data.forEach(rowData => {
      const row = worksheet.addRow(rowData);
      row.eachCell((cell, number) => {
        cell.border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        }
      });
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,'Temperatura_Estacion_Matthei.xlsx');
    });
  }



}
