import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

  private _verifyUrl = "http://gtmd.ddns.net:5000/api/usuario";
  private _loginUrl = "http://gtmd.ddns.net:5000/api/usuario";

  constructor(private http: HttpClient,
              private _router: Router) { }

  verifyUser() {
    return this.http.get<any>(this._verifyUrl);
  }

  loginUser(user) {
    return this.http.put<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/main']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');    
  }
}
