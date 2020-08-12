import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Registro } from '../models/registro';
import { Observable, observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }


  apiUrl = 'http://192.168.1.108:5000/api/registro';

 getRegistro(id: number): Observable<any>{   
    return this.http.get(`${this.apiUrl}/${id}`); 
  }

 getRegistroByFecha(registro: Registro): Observable<any>{   
    return this.http.get(`${this.apiUrl}-fecha/${registro.fecha}`); 
  }
  
 getRegistros():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  createRegistro(registro: Registro): Observable<any>{
    return this.http.post<any>(this.apiUrl, registro, httpOptions);
  }

  updateRegistro(registro: Registro): Observable<any>{
    return this.http.put(`${this.apiUrl}/${registro.id}`, registro, httpOptions);
  }

  deleteRegistro(registro: Registro): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${registro.id}`);
  }

}
