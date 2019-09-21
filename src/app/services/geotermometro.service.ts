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

  apiUrl = 'http://34.70.201.180:5000/api/geotermometro';

async  getGeotermometro(id: number){
    return await this.http.get(`${this.apiUrl}/${id}`);
  }

}
