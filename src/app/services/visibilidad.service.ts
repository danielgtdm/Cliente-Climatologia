import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visibilidad } from '../models/visibilidad';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VisibilidadService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:5000/api/visibilidad';

async getVisibilidad(id: number){
    return await this.http.get(`${this.apiUrl}/${id}`);
  }

  getVisibilidades(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  createVisibilidad(visibilidad: Visibilidad): Observable<any>{
    return this.http.post<any>(this.apiUrl, visibilidad, httpOptions);
  }

  updateVisibilidad(visibilidad: Visibilidad): Observable<any>{
    return this.http.put(`${this.apiUrl}/${visibilidad.id}`, visibilidad, httpOptions);
  }

  deleteVisibilidad(visibilidad: Visibilidad): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${visibilidad.id}`)
  }

}
