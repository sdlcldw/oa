import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import jQuery from 'jquery';
import { TskService } from '../../service/TskService';
import { dateValidator, zzsValidator } from '../../valldators/valldators';
import { getNowFormatDate } from '../../function/function';
import { HttpClient } from '@angular/common/http';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-zjjl',
  templateUrl: './zjjl.component.html',
  styleUrls: ['./zjjl.component.css']
})
export class ZjjlComponent implements OnInit {
  wjformModel: FormGroup;
  ryformModel: FormGroup;
  sf;
  czfw;
  xsdata = [];
  dqxs = [];
  columns = [
    { key: 'sfzh', title: '身份证号' },
    { key: 'name', title: '姓名' },
    { key: 'xb', title: '性别' },
    { key: 'cz', title: '操作' },
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
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false
  };

  dqrq_wj: Date;
  dqrq_ry: Date;
  
  constructor(fb: FormBuilder,private http: HttpClient, private tsk: TskService,private _localeService: BsLocaleService) {
    
    this.wjformModel = fb.group({
      sj: ['', [Validators.required,dateValidator]],
      lhxf: ['', [Validators.required, Validators.maxLength(3), zzsValidator]],
      ms: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    })
    this.ryformModel = fb.group({
      sj: ['', [Validators.required,dateValidator]],
      lhxf: ['', [Validators.required, Validators.maxLength(3), zzsValidator]],
      ms: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    })
  }
  ngOnInit() {
    this._localeService.use('zh-cn');          
    this.getxslb();
  }
  getxslb() {
    this.http.get('/oa/basic/web/index.php?r=xsgl/zjjl_get').subscribe(data => {
      if (data) {
          this.xsdata = data['xs'];
          this.sf = data['sf'];
          this.czfw = data['czfw'];
          console.log(data);
      } else {
        this.tsk.tsk('没有获取到数据！');
      }
    },
    err => {
      this.tsk.tsk('网络请求错误！');
    });
  }
  qkform(){
    this.wjformModel.reset();
    this.ryformModel.reset();
  }
  xzjl(d) {
    this.dqrq_wj = new Date();
    this.dqrq_ry = new Date();
    this.qkform();
    this.dqxs = d;
    console.log(this.dqxs);
    $('#openxzjl').click();
  }
 
  onSubmit_wj() {
    let dat = this.wjformModel.value;
    dat['sfzh'] = this.dqxs['sfzh'];
    this.http.post("/oa/basic/web/index.php?r=xsgl/zjjl_add_wj",dat).subscribe((response) => {
      let data = response;
      if (data) {
        if (data == 1) {
          this.tsk.cg('添加成功！');
          $('#qxant').click();
        } else {
          this.tsk.tsk('添加失败！');
        }
      } else {
        this.tsk.tsk('添加失败！');
      }
    });
  }
  onSubmit_ry() {
    let dat = this.ryformModel.value;
    dat['sfzh'] = this.dqxs['sfzh'];
    let myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/zjjl_add_ry", dat).subscribe((response) => {
      let data = response;
      if (data) {
        if (data == 1) {
          this.tsk.cg('添加成功！');
          $('#qxant').click();
        } else {
          this.tsk.tsk('添加失败！');
        }
      } else {
        this.tsk.tsk('添加失败！');
      }
    });
  }
}
