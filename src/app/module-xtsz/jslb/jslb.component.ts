import { Component, OnInit } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { DataService } from '../DataService';


@Component({
  selector: 'app-jslb',
  templateUrl: './jslb.component.html',
  styleUrls: ['./jslb.component.css']
})
export class JslbComponent implements OnInit {
data;
  constructor(private router: Router,private http:Http,private datasv: DataService,) { }

  ngOnInit() {
    this.http.get('/oa/basic/web/index.php?r=rbac/get_js') // (4)
    .map(res => res.json()) // (5)
    .subscribe(data => {
       if (data) this.data = data; // (6)
    });
  }
fpqx(js){
  let dat = {js:js};
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=rbac/get_item",dat, { headers: myHeaders }).toPromise().then((response) => {
     this.datasv.setfpqxdata(response.json());
    //  console.log(this.datasv.getfpqxdata());
      this.router.navigate(['index/xtsz/fpqx']);
});
 
}
}
