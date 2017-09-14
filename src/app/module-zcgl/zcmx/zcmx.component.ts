import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";



@Component({
  selector: 'app-zcmx',
  templateUrl: './zcmx.component.html',
  styleUrls: ['./zcmx.component.css']
})
export class ZcmxComponent implements OnInit {

  settings = {
    attr:{
      class:'table table-bordered table-hover table-condensed text-center',
    },
    actions:{
      // position:'right',
      columnTitle:'操作'
    },
    add: {
      addButtonContent: '<i title="添加" class="icon ion-ios-plus-outline"></i>',
      createButtonContent: '<i title="确认添加" class="icon ion-checkmark"></i>',
      cancelButtonContent: '<i title="取消" class="icon ion-close"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i title="编辑" class="icon ion-edit"></i>',
      saveButtonContent: '<i title="确认修改" class="icon ion-checkmark"></i>',
      cancelButtonContent: '<i title="取消" class="icon ion-close"></i>',
      confirmSave:true
    },
    delete: {
      deleteButtonContent: '<i title="删除" class="icon ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      bh: {title: '资产编号'},
      name: {title: '资产名称'},
      pp: {title: '品牌'},
      xh: {title: '规格型号'},
      sybm: {title: '使用部门'},
      cfdd: {title: '存放地点'},
      jg: {title: '价格'},
      gzsj: {title: '购置时间'},
      jysj: {title: '借用时间'},
      bz: {title: '备注'},
      zrr: {title: '责任人'},
      lb: {title: '类别'},
      ly: {title: '资产来源'},
      zt: {title: '状态'},
    }
  };
  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private http:Http) { 
    this.http.get('/oa/basic/web/index.php?r=zcgl/get_mx').map(res => res.json()).subscribe(data => {
     
       if(data){
        this.source.load(data);
       }
    });
  }
  ngOnInit() {
  }
  onCreateConfirm(event){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=zcgl/add",event.newData, { headers: myHeaders }).toPromise().then((response) => {
       let data = response.json();
       if(data){
       event.confirm.resolve();
      }else{
        event.confirm.reject();
      }
  });
  }


  onEditConfirm(event){
    let data={
      newdata:event.newData,
      bh:event.data.bh
    }
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=zcgl/updata",data, { headers: myHeaders }).toPromise().then((response) => {
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
let data={data:event.data.bh}
      let myHeaders:Headers = new Headers();
      myHeaders.append("Content-Type","application/json; charset=UTF-8");
      this.http.post("/oa/basic/web/index.php?r=zcgl/delete",data, { headers: myHeaders }).toPromise().then((response) => {
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
