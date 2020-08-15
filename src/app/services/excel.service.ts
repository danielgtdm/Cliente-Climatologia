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


 public generateHumedadExcel(registros: Registro[]) {

    const title = "Humedad Relativa Climatologia Matthei";
    const header = "HUMEDAD";
    let data = [];
    data.push(["Fecha", "08:30 hrs", "14:00 hrs", "18:00 hrs"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const th = registro.TermometroHumedo;
      const ts = registro.TermometroSeco;
      const pa = registro.PresionAtmosferica;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        th.h0830 != null && ts.h0830 != null && pa.h0830 != null ? 
	  this.getHumedadRelativa(th.h0830, ts.h0830, pa.h0830) : 'No Calculado',
        th.h1400 != null && ts.h1400 != null && pa.h1400 != null ? 
	  this.getHumedadRelativa(th.h1400, ts.h1400, pa.h1400) : 'No Calculado',
        th.h1800 != null && ts.h1800 != null && pa.h1800 != null ? 
          this.getHumedadRelativa(th.h1800, ts.h1800, pa.h1800) : 'No Calculado'
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
      fs.saveAs(blob,'Humedad_Relativa_Estacion_Matthei.xlsx');
    });
  }

  public generatePrecipitacionExcel(registros: Registro[]) {

    const title = "Precipitacion Climatologia Matthei";
    const header = "PRECIPITACION"; 
    let data = [];
    data.push(["Fecha", "Precipitacion"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const aguaCaida = registro.agua_caida;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        aguaCaida != null ? aguaCaida : 'No Registrado'
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
      fs.saveAs(blob,'Precipitacion_Estacion_Matthei.xlsx');
    });
  }


  public generateNubosidadExcel(registros: Registro[]) {

    const title = "Nubosidad Climatologia Matthei";
    const header = "NUBOSIDAD";
    let data = [];
    data.push(["Fecha", "08:30 hrs", "14:00 hrs", "18:00 hrs"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const nubosidad = registro.Nubosidad;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        nubosidad.h0830 != null ? nubosidad.h0830 : 'No Registrado',
        nubosidad.h1400 != null ? nubosidad.h1400 : 'No Registrado',
        nubosidad.h1800 != null ? nubosidad.h1800 : 'No Registrado' 
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
      fs.saveAs(blob,'Nubosidad_Estacion_Matthei.xlsx');
    });
  }



  private getHumedadRelativa(th: number, ts: number, pa: number): number {
    var humedadRelativa : number;

    humedadRelativa = 100 * ((6.11 * Math.pow(10, ((7.5 * th) / (th + 237.3)))) - (0.5 * pa * (ts - th) / 755)) / (6.11 * Math.pow(10, ((7.5 * ts) / (ts + 237.3))));

    return Math.round(humedadRelativa * 100) / 100; //Obtener redondeo a 2 decimales
  }

  public generateHorasSolExcel(registros: Registro[]) {

    const title = "Horas Sol Climatologia Matthei";
    const header = "HORAS SOL"; 
    let data = [];
    data.push(["Fecha", "Horas Sol"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const horasSol = registro.horas_sol;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        horasSol != null ? horasSol : 'No Registrado'
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
      fs.saveAs(blob,'Horas_Sol_Estacion_Matthei.xlsx');
    });
  }


  public generateEvaporimetroExcel(registros: Registro[]) {

    const title = "Evaporimetro Climatologia Matthei";
    const header = "EVAPORIMETRO"; 
    let data = [];
    data.push(["Fecha", "Evaporamiento"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const evaporimetro = registro.evaporamiento;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        evaporimetro != null ? evaporimetro : 'No Registrado'
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
      fs.saveAs(blob,'Evaporimetro_Estacion_Matthei.xlsx');
    });
  }


  public generatePresionAtmosfericaExcel(registros: Registro[]) {

    const title = "Presion Atmosferica Climatologia Matthei";
    const header = "PRESION ATMOSFERICA";
    let data = [];
    data.push(["Fecha", "08:30 hrs", "14:00 hrs", "18:00 hrs"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const pa = registro.PresionAtmosferica;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        pa.h0830 != null ? pa.h0830 : 'No Registrado',
        pa.h1400 != null ? pa.h1400 : 'No Registrado',
        pa.h1800 != null ? pa.h1800 : 'No Registrado' 
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
      fs.saveAs(blob,'Presion_Atmosferica_Estacion_Matthei.xlsx');
    });
  }


  public generateVisibilidadExcel(registros: Registro[]) {

    const title = "Visibilidad Climatologia Matthei";
    const header = "VISIBILIDAD";
    let data = [];
    data.push(["Fecha", "08:30 hrs", "14:00 hrs", "18:00 hrs"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const visibilidad = registro.Visibilidad;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        visibilidad.h0830 != null ? visibilidad.h0830 : 'No Registrado',
        visibilidad.h1400 != null ? visibilidad.h1400 : 'No Registrado',
        visibilidad.h1800 != null ? visibilidad.h1800 : 'No Registrado' 
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
      fs.saveAs(blob,'Visibilidad_Estacion_Matthei.xlsx');
    });
  }


  public generateGeotermometroExcel(registros: Registro[]) {

    const title = "Geotermometros Climatologia Matthei";
    const header = "GEOTERMOMETROS";
    let data = [];
    data.push(["Fecha", "2cm", "5cm", "10cm", "20cm", "30cm", "50cm", "100cm"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const gt = registro.Geotermometro;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        gt.cm2 != null ? gt.cm2 : 'No Registrado',
        gt.cm5 != null ? gt.cm5 : 'No Registrado',
        gt.cm10 != null ? gt.cm10 : 'No Registrado',
        gt.cm20 != null ? gt.cm20 : 'No Registrado',
        gt.cm30 != null ? gt.cm30 : 'No Registrado',
        gt.cm50 != null ? gt.cm50 : 'No Registrado',
        gt.cm100 != null ? gt.cm100 : 'No Registrado'
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
      fs.saveAs(blob,'Geotermometros_Estacion_Matthei.xlsx');
    });
  }


  public generateTermometroSecoExcel(registros: Registro[]) {

    const title = "Termometro Seco Climatologia Matthei";
    const header = "TERMOMETRO SECO";
    let data = [];
    data.push(["Fecha", "08:30 hrs", "14:00 hrs", "18:00 hrs"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const ts = registro.TermometroSeco;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        ts.h0830 != null ? ts.h0830 : 'No Registrado',
        ts.h1400 != null ? ts.h1400 : 'No Registrado',
        ts.h1800 != null ? ts.h1800 : 'No Registrado' 
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
      fs.saveAs(blob,'Termometro_Seco_Estacion_Matthei.xlsx');
    });
  }


  public generateTermometroHumedoExcel(registros: Registro[]) {

    const title = "Termometro Humedo Climatologia Matthei";
    const header = "TERMOMETRO HUMEDO";
    let data = [];
    data.push(["Fecha", "08:30 hrs", "14:00 hrs", "18:00 hrs"]);
    for (let index = 0; index < registros.length; index++) {
      const registro = registros[index];

      const th = registro.TermometroHumedo;
      const fecha = registro.fecha.toString().substring(0, 10);
      
      data.push([
        fecha,
        th.h0830 != null ? th.h0830 : 'No Registrado',
        th.h1400 != null ? th.h1400 : 'No Registrado',
        th.h1800 != null ? th.h1800 : 'No Registrado' 
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
      fs.saveAs(blob,'Termometro_Humedo_Estacion_Matthei.xlsx');
    });
  }




}
