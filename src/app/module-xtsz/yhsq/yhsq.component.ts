import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { DataService } from '../DataService';


@Component({
  selector: 'app-yhsq',
  templateUrl: './yhsq.component.html',
  styleUrls: ['./yhsq.component.css']
})
export class YhsqComponent implements OnInit {

  settings = {
    attr:{
      class:'table table-bordered table-hover table-condensed text-center',
    },
    actions:{
      columnTitle:'操作',
      edit:false,
      add:false,
    },
    delete: {
      deleteButtonContent: '<i title="授权" class="icon ion-key"></i>',
      confirmDelete: true
    },
    columns: {
      Id: {title: '用户ID'},
      username: {title: '用户名'},
      item_name:{title:'拥有角色节点'},
    },
    pager:{
      perPage:'20',
    },
  };
    
  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router,private http:Http,private datasv: DataService,) { 
    this.http.get('/oa/basic/web/index.php?r=xtsz/yhsq_get_users').map(res => res.json()).subscribe(data => {
       if(data){
        this.source.load(data);
       }
    });
  }

  ngOnInit() {
  }
  onDeleteConfirm($event){
    let dat = {id:$event.data.Id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/yhsq_get_assignment",dat, { headers: myHeaders }).toPromise().then((response) => {
      let datas :any[]= response.json();
       datas['user']=$event.data;
       this.datasv.setfpjsdata(datas);
       this.router.navigate(['index/xtsz/yhsq-fpjs']);

  });
  }

}
