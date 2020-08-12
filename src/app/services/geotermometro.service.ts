import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geotermometro } from '../models/geotermometro';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GeotermometroService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://192.168.1.108:5000/api/geotermometro';

async  getGeotermometro(id: number){
    return await this.http.get(`${this.apiUrl}/${id}`);
  }

}
