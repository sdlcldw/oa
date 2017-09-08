import { Component, OnInit } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-wdzs',
  templateUrl: './wdzs.component.html',
  styleUrls: ['./wdzs.component.css']
})
export class WdzsComponent implements OnInit {
  names;


constructor(private http:Http) {
  
   }

  ngOnInit() {

this.http.get('/oa/basic/web/index.php?r=index/wdzs') // (4)
        .map(res => res.json()) // (5)
        .subscribe(data => {
           if (data) this.names = data; // (6)
        });

  }

}
