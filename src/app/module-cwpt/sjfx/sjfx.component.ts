import { Component, OnInit } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import * as $ from 'jquery';



@Component({
  selector: 'app-sjfx',
  templateUrl: './sjfx.component.html',
  styleUrls: ['./sjfx.component.css']
})
export class SjfxComponent implements OnInit {


  ifjsxm:boolean = true;
  anjsxm:boolean;
  anny:boolean;
  annd:boolean;
  ifhtgz:boolean;
  iftggz:boolean;
  data:Array<any> = [];
  dataSource:Observable<any>;
  xm;
  ny;
  nd;


  jbgz;
  ksgz;
  yfgz;
  sfgz;


  constructor(private http:Http) { }

  ngOnInit() {
  }


  xm_htgz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/sjfx_jsxm_htgz',$.param({'jsxm':this.xm}),{headers:myHeaders})
    .map((res)=>res.json());
   console.log($.param(this.xm));
   this.dataSource.subscribe(data=>{
                this.data = data;
                this.jbgz = 0;
                this.ksgz = 0;
                this.yfgz = 0;
                this.sfgz = 0;
                for(var o in data){
                  this.jbgz = this.jbgz + Number(data[o]['jbgz']);
                  this.ksgz = this.ksgz + Number(data[o]['ksgz']);
                  this.yfgz = this.yfgz + Number(data[o]['yfgz']);
                  this.sfgz = this.sfgz + Number(data[o]['sfgz']);
                 }
                this.ifjsxm = false;
                this.ifhtgz = false;
                this.iftggz = true;
                this.anjsxm = false;
                this.annd = true;
                this.anny = true;
              }
    )
  }
  xm_tggz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/sjfx_jsxm_tggz',$.param({'jsxm':this.xm}),{headers:myHeaders})
    .map((res)=>res.json());
   console.log($.param(this.xm));
   this.dataSource.subscribe(data=>{
                this.data = data;
                this.jbgz = 0;
                this.ksgz = 0;
                this.yfgz = 0;
                this.sfgz = 0;
                for(var o in data){
                  this.jbgz = this.jbgz + Number(data[o]['jbgz']);
                  this.ksgz = this.ksgz + Number(data[o]['ksf']);
                  this.yfgz = this.yfgz + Number(data[o]['yfhj']);
                  this.sfgz = this.sfgz + Number(data[o]['sfgz']);
                 }
                this.ifjsxm = false;
                this.ifhtgz = true;
                this.iftggz = false;
                this.anjsxm = false;
                this.annd = true;
                this.anny = true;
              }
    )
  }




  ny_htgz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/sjfx_ckny_htgz',$.param({'ckny':this.ny}),{headers:myHeaders})
    .map((res)=>res.json());
   this.dataSource.subscribe(data=>{
                this.data = data;
                this.jbgz = 0;
                this.ksgz = 0;
                this.yfgz = 0;
                this.sfgz = 0;
                for(var o in data){
                  this.jbgz = this.jbgz + Number(data[o]['jbgz']);
                  this.ksgz = this.ksgz + Number(data[o]['ksgz']);
                  this.yfgz = this.yfgz + Number(data[o]['yfgz']);
                  this.sfgz = this.sfgz + Number(data[o]['sfgz']);
                 }
                this.ifjsxm = false;
                this.ifhtgz = false;
                this.iftggz = true;
                this.anjsxm = true;
                this.annd = true;
                this.anny = false;
              }
    )
  }
  ny_tggz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/sjfx_ckny_tggz',$.param({'ckny':this.ny}),{headers:myHeaders})
    .map((res)=>res.json());
   this.dataSource.subscribe(data=>{
                this.data = data;
                this.jbgz = 0;
                this.ksgz = 0;
                this.yfgz = 0;
                this.sfgz = 0;
                for(var o in data){
                  this.jbgz = this.jbgz + Number(data[o]['jbgz']);
                  this.ksgz = this.ksgz + Number(data[o]['ksf']);
                  this.yfgz = this.yfgz + Number(data[o]['yfhj']);
                  this.sfgz = this.sfgz + Number(data[o]['sfgz']);
                 }
                this.ifjsxm = false;
                this.ifhtgz = true;
                this.iftggz = false;
                this.anjsxm = true;
                this.annd = true;
                this.anny = false;
              }
    )
  }


  nd_htgz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/sjfx_cknd_htgz',$.param({'cknd':this.nd}),{headers:myHeaders})
    .map((res)=>res.json());
   this.dataSource.subscribe(data=>{
                this.data = data;
                this.data[0]['username'] = '全体教职工';
                this.data[0]['riqi'] = '全年';                
                this.ifjsxm = false;
                this.ifhtgz = false;
                this.iftggz = true;
                this.anjsxm = true;
                this.annd = false;
                this.anny = true;
              }
    )
  }
  nd_tggz(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=cwpt/sjfx_cknd_tggz',$.param({'cknd':this.nd}),{headers:myHeaders})
    .map((res)=>res.json());
   this.dataSource.subscribe(data=>{
                this.data = data;
                this.data[0]['username'] = '全体教职工';
                this.data[0]['riqi'] = '全年'; 
                this.ifjsxm = false;
                this.ifhtgz = true;
                this.iftggz = false;
                this.anjsxm = true;
                this.annd = false;
                this.anny = true;
              }
    )
  }

}
