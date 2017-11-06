import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";


@Component({
  selector: 'app-bmkqjl',
  templateUrl: './bmkqjl.component.html',
  styleUrls: ['./bmkqjl.component.css']
})
export class BmkqjlComponent implements OnInit {

  pages=[10,30,50];
  page = 30;



  settings = {
    attr:{
      class:'table table-bordered table-hover table-condensed text-center',
    },
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns: {
      kqhm: {title: '考勤编号',width:'150px'},
      xm: {title: '姓名',width:'150px'},
      rq: {title: '日期',width:'150px'},
      dysd: {title: '对应时段',width:'150px'},
      sbsj: {title: '上班时间',width:'150px'},
      xbsj: {title: '下班时间',width:'150px'},
      qdsj: {title: '签到时间',width:'150px'},
      qtsj: {title: '签退时间',width:'150px'},
      cdsj: {title: '迟到时间',width:'150px'},
      ztsj: {title: '早退时间',width:'150px'},
      sfkg: {title: '是否旷工',width:'150px'},
      gzsj: {title: '工作时间',width:'150px'},
      lwqk: {title: '例外情况',width:'150px'},
      bm: {title: '部门',width:'150px'},
    },
    noDataMessage: '没有查询到数据',
    pager: {
        display: true,
        perPage: this.page,
    },
   
  };
  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private http:Http) { 
    this.http.get('/oa/basic/web/index.php?r=grbg/bmkqjl_get').map(res => res.json()).subscribe(data => {
       if(data){
        this.source.load(data);
       }
    });
  }
  ngOnInit() {
  
  }
    
    private setpage(){
       this.source.setPaging(1,this.page);
    }

}