import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormArray, FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../service/TskService';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-jkpj',
  templateUrl: './jkpj.component.html',
  styleUrls: ['./jkpj.component.css']
})
export class JkpjComponent implements OnInit {
  kc_data;
  kc_id ='';
  
  formModel: FormGroup;
  
  xj: number = 0;
  dqkcdata;
  ifjkpj:boolean = false;
  
  ifxskc:boolean = false;
  data;
  columns = [
    { key: 'name', title: '姓名'},
    { key: 'xb', title: '性别'},
    { key: 'njb_name', title: '年级'},
    { key: 'bj_name', title: '班级'},
    { key: 'qj', title: '请假次数'},
    { key: 'cd', title: '迟到次数'},
    { key: 'kc', title: '旷课次数'},
    { key: '', title: '操作'}
  ];
  configuration = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    globalSearchEnabled: true,
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

  modalGrpj: BsModalRef;
  modal_config = {
    animated: false,
    keyboard: true,
    backdrop: false,
    ignoreBackdropClick: false
  };

  khdc;
  py;
  dqxsdata;
  constructor(private fb: FormBuilder, private http: HttpClient, private tsk: TskService,private _localeService: BsLocaleService,private modalService: BsModalService) {
      this.formModel = fb.group({
        sj: ['', [Validators.required]],
        ktqk: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      })
     }
  
    ngOnInit() {
    this.getkc(); 
    this._localeService.use('zh-cn');
    }
  
  
  getkc(){
    this.http.get('/oa/basic/web/index.php?r=grbg/jkpj_get_kc').subscribe(data => {
      if (data) {
        if(data == 2){
          this.tsk.tsk('你当前没有符合结课评价条件的课程！',5000);
          this.ifxskc = true;
        }else{
        this.kc_data= data;
      }}
    });
  }

  xzkc(){
    this.http.post("/oa/basic/web/index.php?r=grbg/jkpj_get_kcmx",{id:this.kc_id}).toPromise().then((response) => {
      this.dqkcdata = response;
      this.data = this.dqkcdata.xskq;
      this.ifxskc= false;
      this.ifjkpj = true;
      console.log(response);
    });
  }

  grpj(template: TemplateRef<any>,data){
    let dt={
      xsid:data.Id,
       kcid:this.dqkcdata.kc.Id,
    }
    this.http.post("/oa/basic/web/index.php?r=grbg/jkpj_get_grpj",dt).toPromise().then((response) => {
      if(response == '3'){
    this.py='';
    this.khdc = '1';
      }else{
        this.py= response['py'];
        this.khdc = response['dc'];
      }
    });
    this.dqxsdata = data;
    this.modalGrpj = this.modalService.show(template,Object.assign({}, this.modal_config, { class: 'modal-grpj' }));
    console.log(data);
  }

  grpj_tj(){
    if(this.py.length > 120){
      this.tsk.tsk('评语不能大于120个字符');
      return;
    }
    let data = {
       xsid:this.dqxsdata.Id,
       kcid:this.dqkcdata.kc.Id,
       dc:this.khdc,
       py:this.py
    }
    this.http.post("/oa/basic/web/index.php?r=grbg/jkpj_add_grpj",data).toPromise().then((response) => {
      console.log(response);
      if(response == '2'){
        this.xzkc(); 
        this.tsk.cg('修改成功!');
        this.modalGrpj.hide();
      }else if(response == '3'){
        this.xzkc(); 
        this.tsk.cg('添加成功!');
        this.modalGrpj.hide();
      }else{
        this.tsk.tsk('操作失败')
      }
      
    });
  }
  
  
  }
  