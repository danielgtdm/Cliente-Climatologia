import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './core/utils/analytics.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private analytics: AnalyticsService, public authService: AuthService){}

  ngOnInit(): void {
      const user = {
        'email': 'app-visualizacion@app',
        'password': 'official'
      }
      this.authService.loginUser(user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
        },
        err => {
          console.log(err);
          alert("usuario y/o contraseña incorrecto");
        } 
      );
    
    this.analytics.trackPageViews();
  }
  
}
