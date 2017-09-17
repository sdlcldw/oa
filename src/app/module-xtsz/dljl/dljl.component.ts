import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-dljl',
  templateUrl: './dljl.component.html',
  styleUrls: ['./dljl.component.css']
})
export class DljlComponent implements OnInit {
  settings = {
    attr:{
      class:'table table-bordered table-hover table-condensed text-center',
    },
    actions:{
      // position:'right',
      // columnTitle:'操作',
      add:false,
      edit:false,
      delete:false,

    },
    columns: {
      Id: {title: 'ID',width:'150px',},
      username: {title: '用户名',width:'150px',},
      time: {title: '登录时间',width:'150px'},
    },
    pager:{
      perPage:'20',
    },
  };
  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private http:Http) {
    this.http.get('/oa/basic/web/index.php?r=xtsz/get_dljl').map(res => res.json()).subscribe(data => {
       if(data){
        this.source.load(data.reverse());
       }
    });
  }
  ngOnInit() {

  
  }
  qk(){
    if (window.confirm('你确定要清空全部数据吗?')) {
       this.http.get('/oa/basic/web/index.php?r=xtsz/qk_dljl').map(res => res.json()).subscribe(data => {
      let da = [];
      this.source.load(da);
   });
  } 
  }
}

  
