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
    rows: 30,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false
  };

  modalRef: BsModalRef;
  modalXzjs: BsModalRef;
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

  constructor(fb: FormBuilder, private http: HttpClient, private tsk: TskService,private modalService: BsModalService) {
    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.maxLength(19)]],
      js: ['', [Validators.required, Validators.maxLength(24)]],
      jsid: ['', [Validators.required]],
      jsjs: ['', [Validators.required, Validators.maxLength(18),Validators.minLength(18)]],
    })
  }

  ngOnInit() {
    // this.getxbkc();
  }
  getxbkc() {
    this.http.get('/oa/basic/web/index.php?r=xsgl/kcsz_get_lb').subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }
  xjkc(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template,Object.assign({}, this.modal_img_config, { class: 'modal-xjkc' }));
  }
  xjkcqx(){
    this.modalRef.hide();
  }
  xzjs(template: TemplateRef<any>){
    console.log('xzjs');
    this.modalXzjs = this.modalService.show(template,Object.assign({}, this.modal_img_config, { class: 'modal-xzjs' }));
  }
  xzjsqx(){
    this.modalXzjs.hide();
  }















}
