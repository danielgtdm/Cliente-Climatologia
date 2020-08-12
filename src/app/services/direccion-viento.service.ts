import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DireccionViento } from '../models/direccion-viento';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DireccionVientoService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://192.168.1.108:5000/api/direccion-viento'; 

 getDireccionViento(id: number): Observable<any>{
    return  this.http.get(`${this.apiUrl}/${id}`);
  }

}
