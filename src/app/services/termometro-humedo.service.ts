import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TermometroHumedo } from '../models/termometro-humedo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TermometroHumedoService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:5000/api/termometro-humedo';

async  getTermometroHumedo(id: number){
    return await this.http.get(`${this.apiUrl}/${id}`);
  }

  getTermometrosHumedos(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  createTermometroHumedo(termometroHumedo: TermometroHumedo): Observable<any>{
    return this.http.post<any>(this.apiUrl, termometroHumedo, httpOptions);
  }

  updateTermometroHumedo(termometroHumedo: TermometroHumedo): Observable<any>{
    return this.http.put(`${this.apiUrl}/${termometroHumedo.id}`, termometroHumedo, httpOptions);
  }

  deleteTermometroHumedo(termometroHumedo: TermometroHumedo): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${termometroHumedo.id}`);
  }

}
