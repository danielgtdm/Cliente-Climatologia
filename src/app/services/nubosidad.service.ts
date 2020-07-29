import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Nubosidad } from '../models/nubosidad';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NubosidadService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:5000/api/nubosidad';

  getNubosidad(id: number): Observable<any>{
    return  this.http.get(`${this.apiUrl}/${id}`);
  }

  getNubosidades(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  createNubosidad(nubosidad: Nubosidad): Observable<any>{
    return this.http.post<any>(this.apiUrl, nubosidad, httpOptions);
  }

  updateNubosidad(nubosidad: Nubosidad): Observable<any>{
    return this.http.put(`${this.apiUrl}/${nubosidad.id}`, nubosidad, httpOptions);
  }

  deleteNubosidad(nubosidad: Nubosidad): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${nubosidad.id}`);
  }

}
