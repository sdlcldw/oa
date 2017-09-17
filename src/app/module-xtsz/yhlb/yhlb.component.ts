import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-yhlb',
  templateUrl: './yhlb.component.html',
  styleUrls: ['./yhlb.component.css']
})
export class YhlbComponent implements OnInit {
  settings = {
    attr:{
      class:'table table-bordered table-hover table-condensed text-center',
    },
    actions:{
      // position:'right',
      columnTitle:'操作'
    },
    add: {
      addButtonContent: '<i title="添加用户" class="icon ion-android-add-circle"></i>',
      createButtonContent: '<i title="确认添加" class="icon ion-checkmark"></i>',
      cancelButtonContent: '<i title="取消" class="icon ion-close"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i title="修改" class="icon ion-edit"></i>',
      saveButtonContent: '<i title="确认修改" class="icon ion-checkmark"></i>',
      cancelButtonContent: '<i title="取消" class="icon ion-close"></i>',
      confirmSave:true,
    },
    delete: {
      deleteButtonContent: '<i title="删除" class="icon ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      Id: {title: '用户ID',width:'150px',editable:false},
      username: {title: '用户名',width:'150px',},
      sfzh: {title: '身份证号',width:'150px'},
      sex: {title: '性别',width:'150px'},
      phone: {title: '电话',width:'150px'},
      email: {title: '邮箱地址',width:'150px',},
      createtime: {title: '账号创建时间',width:'150px'},
      password: {title: '密码密文',width:'150px'},      
      up_time: {title: '最后登录时间',width:'150px'},
      loginip: {title: '最后登录IP',width:'150px'},
    },
    pager:{
      perPage:'20',
    },
    
    
  };
  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private http:Http) { 
    this.http.get('/oa/basic/web/index.php?r=xtsz/get_users').map(res => res.json()).subscribe(data => {
       if(data){
        this.source.load(data);
       }
    });
  }
  ngOnInit() {

  
  }
  onCreateConfirm(event){
   console.log(event.newData) 
   this.source.getAll().then((response)=>{
    for(var i = 0; i < response.length; i++){
      if(event.newData.username === response[i]['username']){
        alert('该编号已存在，请确保编号唯一！');
        event.confirm.reject();
          return;
      }
  }
})
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/add_user",event.newData, { headers: myHeaders }).toPromise().then((response) => {
       let data = response.json();
       if(data){
       event.confirm.resolve();
       console.log(this.source.getAll())
      }else{
        event.confirm.reject();
      }
  });
  }


  onEditConfirm(event){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/updata_user",event.newData, { headers: myHeaders }).toPromise().then((response) => {
       let data = response.json();
       if(data){
       event.confirm.resolve();
      }else{
        event.confirm.reject();
      }
  })
  }

  onDeleteConfirm(event){
    if (window.confirm('你确定要删除吗?')) {
// console.log(event.data.bh)
let data={Id:event.data.Id}
      let myHeaders:Headers = new Headers();
      myHeaders.append("Content-Type","application/json; charset=UTF-8");
      this.http.post("/oa/basic/web/index.php?r=xtsz/delete_user",data, { headers: myHeaders }).toPromise().then((response) => {
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
