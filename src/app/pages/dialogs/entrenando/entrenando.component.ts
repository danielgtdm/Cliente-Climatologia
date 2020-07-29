import { Component, OnInit } from '@angular/core';

let h = 0;
let m = 0;
let s = 0;

@Component({
  selector: 'app-entrenando',
  templateUrl: './entrenando.component.html',
  styleUrls: ['./entrenando.component.scss']
})
export class EntrenandoComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {

    

    // var actual = new Date().getTime();
    // var diff=new Date(actual-inicio);

    // while(true){
    //   var result=this.LeadingZero(diff.getUTCHours())+":"+this.LeadingZero(diff.getUTCMinutes())+":"+this.LeadingZero(diff.getUTCSeconds());

    

    h = 0;
    m = 0;
    s = 0;
   // this.crono();

  }
  
  crono(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    this.tiempo = hAux + ":" + mAux + ":" + sAux;
    setTimeout(()=>{ this.crono() }, 1000);
  }

  LeadingZero(Time) {
		return (Time < 10) ? "0" + Time : + Time;
	}

  public tiempo = '';

}
