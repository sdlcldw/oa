import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-bmjbxx',
  styleUrls: ['./bmjbxx.component.css'],
  templateUrl: './bmjbxx.component.html',
})

export class BmjbxxComponent implements OnInit {

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
      bm: {title: '部门',width:'70%',filter: false},
     },

    }

    source: LocalDataSource = new LocalDataSource();
    

  constructor(private http:Http) {
    this.http.get('/oa/basic/web/index.php?r=xtsz/get_bm').map(res => res.json()).subscribe(data => {
      if(data){
        let da = []
        for(var ele of data){  
         da.push({bm:ele})
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
       if(event.newData.bm === response[i]['bm']){
         alert('该字段已存在，请确保唯一！');
         event.confirm.reject();
           return;
       }
   }
 })
     let myHeaders:Headers = new Headers();
     myHeaders.append("Content-Type","application/json; charset=UTF-8");
     this.http.post("/oa/basic/web/index.php?r=xtsz/add_bm",event.newData, { headers: myHeaders }).toPromise().then((response) => {
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
 let data={data:event.data.bm}
       let myHeaders:Headers = new Headers();
       myHeaders.append("Content-Type","application/json; charset=UTF-8");
       this.http.post("/oa/basic/web/index.php?r=xtsz/delete_bm",data, { headers: myHeaders }).toPromise().then((response) => {
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
