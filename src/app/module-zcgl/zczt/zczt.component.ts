import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-zczt',
  templateUrl: './zczt.component.html',
  styleUrls: ['./zczt.component.css']
})
export class ZcztComponent implements OnInit {
  settings = {
    attr:{
      class:'table table-bordered table-hover table-condensed text-center',
    },
    actions:{
      columnTitle:'操作',
      edit:false,
    },
    add: {
      addButtonContent: '<i title="添加" class="icon ion-android-add-circle"></i>',
      createButtonContent: '<i title="确认添加" class="icon ion-checkmark"></i>',
      cancelButtonContent: '<i title="取消" class="icon ion-close"></i>',
      confirmCreate:true
    },
    delete: {
      deleteButtonContent: '<i title="删除" class="icon ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      zt: {title: '资产状态',width:'70%',filter: false},
     },

    }
   

  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private http:Http) { 
    this.http.get('/oa/basic/web/index.php?r=zcgl/zczt_get').map(res => res.json()).subscribe(data => {
       if(data){
         let da = []
         for(var ele of data){  
          da.push({zt:ele})
      }
        this.source.load(da);
       }
    });
  }
  ngOnInit() {

  
  }
  onCreateConfirm(event){
   this.source.getAll().then((response)=>{
    for(var i = 0; i < response.length; i++){
      if(event.newData.zt === response[i]['zt']){
        alert('该状态已存在，请确保状态唯一！');
        event.confirm.reject();
          return;
      }
  }
})
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=zcgl/zczt_add",event.newData, { headers: myHeaders }).toPromise().then((response) => {
       let data = response.json();
       if(data){
       event.confirm.resolve();
      }else{
        event.confirm.reject();
      }
  });
  }

  onDeleteConfirm(event){
    if (window.confirm('你确定要删除吗?')) {
let data={data:event.data.zt}
      let myHeaders:Headers = new Headers();
      myHeaders.append("Content-Type","application/json; charset=UTF-8");
      this.http.post("/oa/basic/web/index.php?r=zcgl/zczt_delete",data, { headers: myHeaders }).toPromise().then((response) => {
         let data = response.json();
         if(data){
         event.confirm.resolve();
        }else{
          event.confirm.reject();
        }
    })
    } else {
      event.confirm.reject();
    }
  }
}
