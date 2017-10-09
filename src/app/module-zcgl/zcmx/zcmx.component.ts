import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import { BmEditor } from './custom-editor/custom-editor-bm';
import { ZtEditor } from './custom-editor/custom-editor-zt';
import { LbEditor } from './custom-editor/custom-editor-lb';
import { LyEditor } from './custom-editor/custom-editor-ly';



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
      addButtonContent: '<i title="添加" class="icon ion-android-add-circle"></i>',
      createButtonContent: '<i title="确认添加" class="icon ion-checkmark"></i>',
      cancelButtonContent: '<i title="取消" class="icon ion-close"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i title="编辑" class="icon ion-edit"></i>',
      saveButtonContent: '<i title="确认修改" class="icon ion-checkmark"></i>',
      cancelButtonContent: '<i title="取消" class="icon ion-close"></i>',
      confirmSave:true,
    },
    delete: {
      deleteButtonContent: '<i title="删除" class="icon ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      bh: {title: '资产编号',width:'150px',editable:false},
      name: {title: '资产名称',width:'150px',},
      pp: {title: '品牌',width:'150px'},
      xh: {title: '规格型号',width:'150px'},
      sybm: {
        title: '使用部门',
        width:'150px',
        type: 'html',
        editor: {
          type: 'custom',
          component: BmEditor,
        },
      },
      cfdd: {title: '存放地点',width:'150px'},
      jg: {title: '价格',width:'150px'},
      gzsj: {title: '购置时间',width:'150px'},
      jysj: {title: '借用时间',width:'150px'},
      bz: {title: '备注',width:'150px'},
      zrr: {title: '责任人',width:'150px'},
      lb: {title: '类别',width:'150px', type: 'html',
      editor: {
        type: 'custom',
        component: LbEditor,
      },},
      ly: {title: '资产来源',width:'150px', type: 'html',
      editor: {
        type: 'custom',
        component: LyEditor,
      },},
      zt: {title: '状态',width:'150px', type: 'html',
      editor: {
        type: 'custom',
        component: ZtEditor,
      },},
    
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
   console.log(event.newData.bh) 
   this.source.getAll().then((response)=>{
    for(var i = 0; i < response.length; i++){
      if(event.newData.bh === response[i]['bh']){
        alert('该编号已存在，请确保编号唯一！');
        event.confirm.reject();
          return;
      }
  }
})
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=zcgl/add",event.newData, { headers: myHeaders }).toPromise().then((response) => {
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
  dcexcel(){
    window.open('/oa/basic/web/index.php?r=zcgl/dcexcel');
    // window.location.href="/oa/basic/web/index.php?r=zcgl/dcexcel";
  }
}
