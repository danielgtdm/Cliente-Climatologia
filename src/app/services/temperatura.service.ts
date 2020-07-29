import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Temperatura } from '../models/temperatura';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:5000/api/temperatura';

async  getTemperatura(id: number){
    return await this.http.get(`${this.apiUrl}/${id}`);
  }

  getTemperaturas(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  createTemperatura(temperatura: Temperatura): Observable<any>{
    return this.http.post<any>(this.apiUrl, temperatura, httpOptions);
  }

  updateTemperatura(temperatura: Temperatura): Observable<any>{
    return this.http.put(`${this.apiUrl}/${temperatura.id}`, temperatura, httpOptions);
  }

  deleteTemperatura(temperatura: Temperatura): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${temperatura.id}`);
  }
  
}
