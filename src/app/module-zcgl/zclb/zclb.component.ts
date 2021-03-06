import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-zclb',
  templateUrl: './zclb.component.html',
  styleUrls: ['./zclb.component.css']
})
export class ZclbComponent implements OnInit {
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
      lb: {title: '资产类别',width:'70%',filter: false},
     },

    }
   

  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private http:Http) { 
    this.http.get('/oa/basic/web/index.php?r=zcgl/zclb_get').map(res => res.json()).subscribe(data => {
       if(data){
         let da = []
         for(var ele of data){  
          da.push({lb:ele})
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
      if(event.newData.lb === response[i]['lb']){
        alert('该字段已存在，请确保唯一！');
        event.confirm.reject();
          return;
      }
  }
})
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=zcgl/zclb_add",event.newData, { headers: myHeaders }).toPromise().then((response) => {
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
let data={data:event.data.lb}
      let myHeaders:Headers = new Headers();
      myHeaders.append("Content-Type","application/json; charset=UTF-8");
      this.http.post("/oa/basic/web/index.php?r=zcgl/zclb_delete",data, { headers: myHeaders }).toPromise().then((response) => {
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