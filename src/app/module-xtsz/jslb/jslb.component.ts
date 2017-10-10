import { Component, OnInit } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Component({
  selector: 'app-jslb',
  templateUrl: './jslb.component.html',
  styleUrls: ['./jslb.component.css']
})
export class JslbComponent implements OnInit {
data;
  constructor(private router: Router,private http:Http) { }

  ngOnInit() {
    this.http.get('/oa/basic/web/index.php?r=rbac/get_item') // (4)
    .map(res => res.json()) // (5)
    .subscribe(data => {
       if (data) this.data = data; // (6)
    });
  }
fpqx(data){
  this.router.navigate(['index/xtsz/fpqx'],{ queryParams: { data: data } })
}
}
