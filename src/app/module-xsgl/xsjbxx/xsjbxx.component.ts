import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { TskService } from 'app/service/TskService';
import {FileUploader} from "ng2-file-upload";
import * as $ from 'jquery';
import jQuery from 'jquery';

@Component({
  selector: 'app-xsjbxx',
  templateUrl: './xsjbxx.component.html',
  styleUrls: ['./xsjbxx.component.css']
})

export class XsjbxxComponent implements OnInit {

  formModel: FormGroup;
  ifsczp:boolean = false;
  iftjxsxx:boolean = false;
  ifxsxxlb:boolean = true;
  data_njb:Array<any>;
  data_bj;
  xznjb;
  data_ss_ly;
  data_ss_lc;
  data_ss_fj;
  data_ss_cw;
  ckxsxxdata:Array<any> = [];

  data = [];
  columns = [
    { key: 'Id', title: 'id' },
    { key: 'name', title: '姓名' },
    { key: 'xjh', title: '学籍号' },
    { key: 'sfzh', title: '身份证号' },
    { key: 'xb', title: '性别' },
    { key: 'njb_name', title: '所在年级' },
    { key: 'bj_name', title: '所在班级' },
    { key: 'jtzz', title: '家庭住址' },    
    { key: 'lxfs_1', title: '家长电话1' },
    { key: 'lxfs_2', title: '家长电话2' },
    { key: '操作', title: '操作' },
  ];
  configuration = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: false,
    globalSearchEnabled: false,
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
  constructor(fb: FormBuilder, private http: Http, private router: Router,private tsk: TskService) { 
    this.formModel = fb.group({
      Id:'',
      name: ['', [Validators.required, Validators.maxLength(19)]],
      xjh: ['', [Validators.required,Validators.maxLength(24)]],
      xb: ['', [Validators.required, Validators.maxLength(24)]],
      sfzh: ['', [Validators.required, Validators.maxLength(24)]],
      sg: ['', [Validators.required, Validators.maxLength(24)]],
      tz: ['', [Validators.required, Validators.maxLength(24)]],
      jtzz: ['', [Validators.required, Validators.maxLength(24)]],
      mz: ['', [Validators.required, Validators.maxLength(24)]],
      jg: ['', [Validators.required, Validators.maxLength(24)]],
      szbj: ['', [Validators.required, Validators.maxLength(24)]],
      sfzx: ['是', [Validators.required]],
      szss: ['', [Validators.required,Validators.maxLength(24)]],
      gx_1: ['', [Validators.required,Validators.maxLength(24)]],
      xm_1: ['', [Validators.required,Validators.maxLength(24)]],
      zzmm_1: ['', [Validators.required, Validators.maxLength(24)]],
      gzdw_1: ['', [Validators.required, Validators.maxLength(24)]],
      lxfs_1: ['', [Validators.required, Validators.maxLength(24)]],
      gx_2: [''],
      xm_2: [''],
      zzmm_2: [''],
      gzdw_2: [''],
      lxfs_2: [''],
    })
  }

  ngOnInit() {
   this.getxsxxlb();
  }

  getxsxxlb(){
    this.http.get('/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_get_lb').map(res => res.json()).subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }

  getnjb(){
    this.http.get('/oa/basic/web/index.php?r=xsgl/jcxxsz_get_njb').map(res => res.json()).subscribe(data => {
      if(data){
       this.data_njb= data;
       console.log(data);
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }
  getbj(data){
    let dat = {njbid:data};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_get_bj",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.data_bj = data;
       }else{
      this.tsk.tsk('获取班级数据失败！');         
       }
  });
  }
  get_ss_ly(){
    this.http.get('/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_get_ss_ly').map(res => res.json()).subscribe(data => {
      if(data){
       this.data_ss_ly= data;
       console.log(data);
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }
  get_ss_lc(data){
    this.data_ss_fj = [];
    this.data_ss_cw = [];
    let dat = {id:data};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_get_ss_lc",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.data_ss_lc = data;
       }else{
      this.tsk.tsk('获取数据失败！');         
       }
  });
  }
  get_ss_fj(data){
    this.data_ss_cw = [];
    let dat = {id:data};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_get_ss_fj",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.data_ss_fj = data;
       }else{
      this.tsk.tsk('获取数据失败！');         
       }
  });
  }
  get_ss_cw(data){
    let dat = {id:data};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_get_ss_cw",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.data_ss_cw = data;
       }else{
      this.tsk.tsk('获取数据失败！');         
       }
  });
  }

   // B: 初始化定义uploader变量,用来配置input中的uploader属性
   public uploader:FileUploader = new FileUploader({
    url: "/oa/basic/web/index.php?r=jssczp/uploadfile",
    method: "POST",
    itemAlias: "uploadedfile",
    removeAfterUpload:true,
});
// C: 定义事件，选择文件
selectedFileOnChanged(event:any) {
    // 打印文件选择名称
}
// D: 定义事件，上传文件
uploadFile() {
    // 上传
    // this.uploader.queue[0].onSuccess = function (response, status, headers) {
      this.uploader.queue[0].onSuccess = (response, status, headers) => {    
        // 上传文件成功
        if (status == 200) {
            // 上传文件后获取服务器返回的数据
            // let tempRes = JSON.parse(response);
            if(response == '1'){
              alert('上传成功！');
            }else{
            alert(response);
          }
        } else {
            // 上传文件后获取服务器返回的数据错误
            alert("上传失败了");
        }
    };
    this.uploader.queue[0].upload(); // 开始上传
}
sczp(){
  this.ifsczp = true;
}
qxsczp(){
  this.ifsczp = false;
}

onSubmit(){
  console.log(this.formModel.value);
  let dat = this.formModel.value;
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_add",dat, { headers: myHeaders }).toPromise().then((response) => {
    let data= response.json();
     if(data){
       if(data == 1){
         this.tsk.cg('添加成功！')
       }else{
      this.tsk.tsk('添加失败！');               
       }
     }else{
      this.tsk.tsk('添加失败！');         
     }
});
}

tjxsxx(){
  this.ifxsxxlb = false;
  this.getnjb();
  this.get_ss_ly();
  this.iftjxsxx = true;
}
//查看学生详细信息
ckxxxx(id){
  let dat = {id:id};
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_ck_get",dat, { headers: myHeaders }).toPromise().then((response) => {
    let data= response.json();
     if(data){
      console.log(data[0]);
      this.ckxsxxdata = data[0];
      console.log(this.formModel.value);
      $('#openckxsxx').click();
     }else{
      this.tsk.tsk('操作失败！');         
     }
});
  
}

//编辑学生信息
bjxsxx(id){
  let dat = {id:id};
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_get",dat, { headers: myHeaders }).toPromise().then((response) => {
    let data= response.json();
     if(data){
      console.log(data[0]);
      this.formModel.setValue(
      {
      Id: data[0].Id,
      name: data[0].name,
      xjh:data[0].xjh,
      xb: data[0].xb,
      sfzh: data[0].sfzh,
      sg: data[0].sg,
      tz: data[0].tz,
      jtzz: data[0].jtzz,
      mz: data[0].mz,
      jg: data[0].jg,
      szbj: data[0].szbj,
      sfzx: data[0].sfzx,
      szss:data[0].szss,
      gx_1:data[0].gx_1,
      xm_1:data[0].xm_1,
      zzmm_1: data[0].zzmm_1,
      gzdw_1: data[0].gzdw_1,
      lxfs_1: data[0].lxfs_1,
      gx_2: data[0].gx_2,
      xm_2: data[0].xm_2,
      zzmm_2: data[0].zzmm_2,
      gzdw_2: data[0].gzdw_2,
      lxfs_2: data[0].lxfs_2,
    });
      console.log(this.formModel.value)
     }else{
      this.tsk.tsk('操作失败！');         
     }
});
  $('#openbjxsxx').click();
}
//删除学生信息
delxsxx(id){
  let dat = {id:id};
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_del",dat, { headers: myHeaders }).toPromise().then((response) => {
    let data= response.json();
     if(data){
       if(data == 1){
         this.tsk.cg('删除成功！')
         this.getxsxxlb();
       }else{
      this.tsk.tsk('操作失败！');               
       }
     }else{
      this.tsk.tsk('操作失败！');         
     }
});
}
//显示学生信息列表
xsxxlb(){
  this.iftjxsxx = false;
  this.ifxsxxlb = true;
}
//编辑学生信息提交
bjxsxx_submit(){
  console.log(this.formModel.value);
  let dat = this.formModel.value;
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_xsjbxx_edit",dat, { headers: myHeaders }).toPromise().then((response) => {
    let data= response.json();
     if(data){
       if(data == 1){
         this.tsk.cg('修改成功！')
         this.getxsxxlb();
       }else{
      this.tsk.tsk('操作失败！');               
       }
     }else{
      this.tsk.tsk('操作失败！');         
     }
});
}
}
