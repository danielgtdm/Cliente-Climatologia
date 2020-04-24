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


  private _url = "http://34.70.201.180:5000/api/excel";
  ƒ

  constructor(private http: HttpClient) { }


  async generateExcel(registros: Registro[]) {

    const title = "Climatologia Matthei";
    const header = ["X", "Y"];
    var data = [];
    for (let index = 0; index < registros.length; index++) {
      const reg = registros[index];
      const tem = registros[index].Temperatura;
      
      data.push([
        ["Fecha", reg.fecha],
        ["Minima", tem.minima],
        ["Maxima", tem.maxima],
        ["Media", ((tem.minima + tem.maxima)/2)]
      ]);

    }
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Estacion");

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    const subtitleRow = worksheet.addRow([]);

    const headerRow = worksheet.addRow([header]);
    worksheet.addRows(data);
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,'temperaturas.xlsx');
    });
  }



}
