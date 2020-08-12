import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TermometroSeco } from '../models/termometro-seco';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TermometroSecoService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://192.168.1.108:5000/api/termometro-seco';

async  getTermometroSeco(id: number){
    return await this.http.get(`${this.apiUrl}/${id}`);
  }

  getTermometrosSecos(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  createTermometroSeco(termometroSeco: TermometroSeco): Observable<any>{
    return this.http.post<any>(this.apiUrl, termometroSeco, httpOptions);
  }

  updateTermometroSeco(termometroSeco: TermometroSeco): Observable<any>{
    return this.http.put(`${this.apiUrl}/${termometroSeco.id}`, termometroSeco, httpOptions);
  }

  deleteTermometroSeco(termometroSeco: TermometroSeco): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${termometroSeco.id}`);
  }

}
