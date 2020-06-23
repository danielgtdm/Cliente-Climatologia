import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import { Registro } from 'src/app/models/registro';
import * as fs from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {


  private _url = "http://192.168.1.19:5000/api/excel";
  

  constructor(private http: HttpClient) { }


  async generateExcel(registros: Registro[]) {

    const title = "Temperatura Climatologia Matthei";
    const header = "TEMPERATURAS";
    var data = [];
    data.push(["Fecha", "Minima", "Maxima", "Media"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const temperatura = registro.Temperatura;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        temperatura.minima ? temperatura.minima : 'No Registrado',
        temperatura.maxima ? temperatura.maxima : 'No Registrado',
        temperatura.minima && temperatura.maxima ? 
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
    //const row = worksheet.addRows(data);

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,'Temperatura_Estacion_Matthei.xlsx');
    });
  }



}
