import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PresionAtmosferica } from '../models/presion-atmosferica';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PresionAtmosfericaService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://34.70.201.180:5000/api/presion-atmosferica';

async  getPresionAtmosferica(id: number){
    return await this.http.get(`${this.apiUrl}/${id}`);
  }

  getPresionesAtmosfericas(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  createPresionAtmosferica(presionAtmosferica: PresionAtmosferica): Observable<any>{
    return this.http.post<any>(this.apiUrl, presionAtmosferica, httpOptions);
  }

  updatePresionAtmosferica(presionAtmosferica: PresionAtmosferica): Observable<any>{
    return this.http.put(`${this.apiUrl}/${presionAtmosferica.id}`, presionAtmosferica, httpOptions);
  }

  deletePresionAtmosferica(presionAtmosferica: PresionAtmosferica): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${presionAtmosferica.id}`);
  }
}
