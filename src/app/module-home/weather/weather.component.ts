import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weekday:any[]=[];
  xq:any;
  rq:any;
  sj:any;
  constructor() {
    
  setInterval(() =>{
          this.sj = new Date();
               },1000)

  }
   
  ngOnInit() {
    var weekday:any[]=[];
    var xq;
    var rq;
    var sj;
                weekday[0]="星期天";
                weekday[1]="星期一";
                weekday[2]="星期二";
                weekday[3]="星期三";
                weekday[4]="星期四";
                weekday[5]="星期五";
                weekday[6]="星期六";
            var now = new Date();
            this.xq = weekday[now.getDay()];
            this.rq = now;
            this.sj = now;
}
}