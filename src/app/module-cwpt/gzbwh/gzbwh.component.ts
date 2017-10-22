import { Component, OnInit } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import * as $ from 'jquery';


@Component({
  selector: 'app-gzbwh',
  templateUrl: './gzbwh.component.html',
  styleUrls: ['./gzbwh.component.css']
})
export class GzbwhComponent implements OnInit {

ckny;
dataSource:Observable<any>;
data:Array<any> = [];
ifjsxm:boolean = true;
ifhtgz:boolean = true;
iftggz:boolean = true;
  constructor(private http:Http) {





  }

  ngOnInit() {
  }


  ny_htgz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/gzbwh_ckny_htgz',$.param({'ckny':this.ckny}),{headers:myHeaders})
    .map((res)=>res.json());
   console.log($.param(this.ckny));
   this.dataSource.subscribe(data=>{
                console.log(data);
                this.data = data;
                this.ifjsxm = false;
                this.ifhtgz = false;
                this.iftggz = true;
              }
    )
  }
  ny_tggz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/gzbwh_ckny_tggz',$.param({'ckny':this.ckny}),{headers:myHeaders})
    .map((res)=>res.json());
   console.log($.param(this.ckny));
   this.dataSource.subscribe(data=>{
                console.log(data);
                this.data = data;
                this.ifjsxm = false;
                this.ifhtgz = true;
                this.iftggz = false;
              }
    )
  }

  dele_htgz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/gzbwh_dele_htgz',$.param({'ckny':this.ckny}),{headers:myHeaders})
    .map((res)=>res.json());
   console.log($.param(this.ckny));
   this.dataSource.subscribe(data=>{
                console.log(data);
                alert("成功删除"+data+"条数据！");
                this.data=[];
              }
    )
  }

  dele_tggz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/gzbwh_dele_tggz',$.param({'ckny':this.ckny}),{headers:myHeaders})
    .map((res)=>res.json());
   console.log($.param(this.ckny));
   this.dataSource.subscribe(data=>{
                console.log(data);
                alert("成功删除"+data+"条数据！");
                this.data=[];
              }
    )
  }



}
