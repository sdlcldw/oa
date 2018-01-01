import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import jQuery from 'jquery';

@Component({
  selector: 'app-ckjl',
  templateUrl: './ckjl.component.html',
  styleUrls: ['./ckjl.component.css']
})

export class CkjlComponent implements OnInit {
  xsdata = [];  
  bj_data=[];
  nj_data=[];
  form_name;
  form_bj = '';
  ckxsxx_jbxx=[];
  ckxsxx_wj=[];
  ckxsxx_ry=[];
  columns = [
    { key: 'xjh', title: '学籍号' },
    { key: 'name', title: '姓名' },
    { key: 'xb', title: '性别' },
    { key: 'sfzx', title: '是否住校' },
    { key: 'lxfs_1', title: '联系家长' },
    { key: 'cz', title: '操作' },
  ];
  configuration = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    globalSearchEnabled: true,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: true,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false
  };
  constructor(fb: FormBuilder, private http: Http, private tsk: TskService) {

  }

  ngOnInit() {
    this.getnjb();
  }

  ck_name(){
    console.log(this.form_name);
    let dat = {name:this.form_name};
    let myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/xsczjl_ckjl_xsxx_name",dat,{ headers: myHeaders }).toPromise().then((response) => {
      let data = response.json();
      if (data) {
          this.xsdata = data;
      } else {
        this.tsk.tsk('获取数据失败！');
      }
    });
  }
  ck_bj(){
    console.log(this.form_bj);
    let dat = {id:this.form_bj};
    let myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/xsczjl_ckjl_xsxx_bj", dat, { headers: myHeaders }).toPromise().then((response) => {
      let data = response.json();
      if (data) {
          this.xsdata = data;
      } else {
        this.tsk.tsk('获取数据失败！');
      }
    });
  }
  getnjb(){
    this.http.get('/oa/basic/web/index.php?r=xsgl/xsczjl_ckjl_get_njb').map(res => res.json()).subscribe(data => {
      if(data){
       this.nj_data= data;
       console.log(data);
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }
 getbj(d){
   this.bj_data = [];
  console.log(d);
  let dat = {id:d};
  let myHeaders: Headers = new Headers();
  myHeaders.append("Content-Type", "application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/xsczjl_ckjl_get_bj", dat, { headers: myHeaders }).toPromise().then((response) => {
    let data = response.json();
    if (data) {
        this.bj_data = data;
    } else {
      this.tsk.tsk('获取数据失败！');
    }
  });
 }
ckxq(d){
 console.log(d);
 let dat = {xjh:d};
 let myHeaders: Headers = new Headers();
 myHeaders.append("Content-Type", "application/json; charset=UTF-8");
 this.http.post("/oa/basic/web/index.php?r=xsgl/xsczjl_ckjl_ckxq", dat, { headers: myHeaders }).toPromise().then((response) => {
   let data = response.json();
   if (data) {
       console.log(data);
       this.ckxsxx_jbxx = data['jbxx'];
       this.ckxsxx_wj = data['wj'];
       this.ckxsxx_ry = data['ry'];
   } else {
     this.tsk.tsk('获取数据失败！');
   }
 });
 $('#openckxq').click(); 
}


























}
