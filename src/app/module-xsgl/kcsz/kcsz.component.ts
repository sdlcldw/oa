import { Component, OnInit ,TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { FileUploader } from "ng2-file-upload";
import * as $ from 'jquery';
import jQuery from 'jquery';
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../service/TskService';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-kcsz',
  templateUrl: './kcsz.component.html',
  styleUrls: ['./kcsz.component.css']
})


export class KcszComponent implements OnInit {
  formModel: FormGroup;  
  data;
  columns = [
    { key: 'Id', title: 'id' },
    { key: 'name', title: '课程名称' },
    { key: 'userneme', title: '讲师' },
    { key: 'rs', title: '人数上限' },
    { key: 'kssj', title: '开始时间' },
    { key: 'jssj', title: '结束时间' },
    { key: 'zt', title: '课程状态' },    
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
    rows: 30,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false
  };

  modalRef: BsModalRef;
  modalXzjs: BsModalRef;
  modalBjkc: BsModalRef;
  modal_img_config = {
    animated: false,
    keyboard: true,
    backdrop: false,
    ignoreBackdropClick: false
  };

  public uploader: FileUploader = new FileUploader({
    url: "/oa/basic/web/index.php?r=xssczp/uploadfile",
    method: "POST",
    itemAlias: "uploadedfile",
    removeAfterUpload: true,
    autoUpload: true,
  });


  userdata;
  ss_name;
  users;
  dqjs={};
  jsimage;
  ifimg:boolean=true;
  dqxs;
  constructor(fb: FormBuilder, private http: HttpClient, private tsk: TskService,private modalService: BsModalService,private _localeService: BsLocaleService) {
    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      kksj: ['', [Validators.required]],
      rs: ['', [Validators.required]],
      js: ['', [Validators.required, Validators.maxLength(120)]],
      jsid: ['', [Validators.required]],
      jsjs: ['', [Validators.required, Validators.maxLength(120),Validators.minLength(10)]],
      zt: ['', [Validators.required]],      
    })
  }

  ngOnInit() {
    this._localeService.use('zh-cn');   
    this.getxbkc();
  }
  del(_id){
    if (window.confirm('你确定要删除吗?该操作会删除所有与此课程有关的信息，包括选课信息，不可逆的操作！')) {
    this.http.post("/oa/basic/web/index.php?r=xsgl/kcsz_del", {Id:_id,}).toPromise().then((response) => {
      if (response == 1) {
        this.getxbkc();
        this.tsk.cg('删除成功！');                
      } else {
        this.tsk.tsk('操作失败！');
      }
    });
    }
  }
  //编辑课程
  bj(_id,template: TemplateRef<any>){
    this.dqxs={};
    this.dqjs = {};    
    this.formModel.reset();
    this.http.post("/oa/basic/web/index.php?r=xsgl/kcsz_bj", {id:_id,}).toPromise().then((response) => {
      console.log(response);
      let data = response;
      if (response) {
        this.formModel.setValue({
          name:response['name'],
          kksj:[new Date(response['kssj']), new Date(response['jssj'])],
          // kksj:[response['kssj'],response['jssj']],
          rs:response['rs'],
          js: response['js'],
          jsid: response['user_id'],
          jsjs: response['jsjs'],
          zt:response['zt'],
        })
        this.dqjs['username'] = response['username'];
        this.dqxs = response;
        this.jsimage = "assets/images/jsimg/" + this.dqjs['user_id'] + ".jpg?" + Math.random();
        this.getxbkc();
      } else {
        this.tsk.tsk('获取信息失败！');
      }
    });
    this.modalBjkc = this.modalService.show(template,Object.assign({}, this.modal_img_config, { class: 'modal-bjkc' }));
    this.sximg();
  }
  bjkcqx(){
    this.modalBjkc.hide();    
  }
  bjkc_tj(){
    var data = this.formModel.value;
    data['Id'] = this.dqxs['Id'];
    this.http.post("/oa/basic/web/index.php?r=xsgl/kcsz_up", data).toPromise().then((response) => {
      let data = response;
      if (data == 1) {
        this.getxbkc();
        this.tsk.cg('编辑课程成功！');
        this.modalBjkc.hide();
      } else {
        this.tsk.tsk('操作失败！');
      }
    });
  }
  getxbkc() {
    this.http.get('/oa/basic/web/index.php?r=xsgl/kcsz_get_lb').subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }
  //新建课程
  xjkc(template: TemplateRef<any>){
    this.formModel.reset();
    this.dqjs={};
    this.modalRef = this.modalService.show(template,Object.assign({}, this.modal_img_config, { class: 'modal-xjkc' }));
  }
  xjkcqx(){
    this.modalRef.hide();
  }
  //选择讲师
  xzjs(template: TemplateRef<any>){
    this.http.get('/oa/basic/web/index.php?r=xsgl/kcsz_get_users').subscribe(data => {
      if (data) {
        this.userdata = data;
        this.users = data;
      }
    });
    console.log('xzjs');
    this.modalXzjs = this.modalService.show(template,Object.assign({}, this.modal_img_config, { class: 'modal-xzjs' }));
  }
  xzjsqx(){
    this.modalXzjs.hide();
  }
  ssyh(){
    let data = new Array();
    for(var i=0;i<this.userdata.length;i++){
     if(this.userdata[i]['username'].indexOf(this.ss_name) > -1){
      data.push(this.userdata[i]);
     }
     }
     console.log(data);
     if(data){
       this.users = data;
       console.log(data)
     }else{
       this.tsk.tsk('未查到结果!')
     }
  }
swjs(x){
  this.sximg();
    this.dqjs = x;
    console.log(this.dqjs)
    let data = this.formModel.value;
    this.formModel.setValue({
      name: data.name,
      kksj:data.kksj,      
      js: data.js,
      jsid: x.Id,
      jsjs: data.jsjs,
      rs:data.rs,
      zt:data.zt,
    })
    this.jsimage = "assets/images/jsimg/" + this.dqjs['Id'] + ".jpg?" + Math.random();
  this.modalXzjs.hide();
}
xjkc_tj(){
  console.log(this.formModel.value)
  this.http.post("/oa/basic/web/index.php?r=xsgl/kcsz_add", this.formModel.value).toPromise().then((response) => {
    let data = response;
    if (data == 1) {
      this.getxbkc();
      this.tsk.cg('新建课程成功！');
      this.modalRef.hide();
    } else {
      this.tsk.tsk('操作失败！');
    }
  });
}
sximg(){
  this.ifimg = false;  
  setTimeout(()=>{this.ifimg = true;},1000); 
  
}




}
