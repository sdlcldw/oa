import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import jQuery from 'jquery';
import { dateValidator, zzsValidator } from 'app/valldators/valldators';
import { getNowFormatDate } from 'app/function/function';

@Component({
  selector: 'app-zjjl',
  templateUrl: './zjjl.component.html',
  styleUrls: ['./zjjl.component.css']
})
export class ZjjlComponent implements OnInit {
  wjformModel: FormGroup;
  ryformModel: FormGroup;
  bm = [];
  xsdata = [];
  dqxs = [];
  dqrq_ry;
  dqrq_wj;
  columns = [
    { key: 'xjh', title: '学籍号' },
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
  constructor(fb: FormBuilder, private http: Http, private tsk: TskService) {
    this.wjformModel = fb.group({
      sj: ['', [Validators.required, dateValidator]],
      lhxf: ['', [Validators.required, Validators.maxLength(3), zzsValidator]],
      ms: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    })
    this.ryformModel = fb.group({
      sj: ['', [Validators.required, dateValidator]],
      lhxf: ['', [Validators.required, Validators.maxLength(3), zzsValidator]],
      ms: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    })
  }
  ngOnInit() {
    this.getxslb();
  }
  getxslb() {
    this.http.get('/oa/basic/web/index.php?r=xsgl/xsczjl_zjjl_get').map(res => res.json()).subscribe(data => {
      if (data) {
        if (data[0] == '2') {
          this.tsk.tsk('没有权限访问', 3000);
        } else {
          this.xsdata = data['xs'];
          this.bm = data['bm'];
          console.log(data);
        }
      } else {
        this.tsk.tsk('没有获取到数据！');
      }
    });
  }
  qkform(){
    this.wjformModel.reset();
    this.ryformModel.reset();
  }
  xzjl(d) {
    this.qkform();
    this.dqxs = d;
    console.log(this.dqxs);
    $('#openxzjl').click();
  }
  set_dqrq_ry() {
    this.dqrq_ry = getNowFormatDate();
  }
  set_dqrq_wj() {
    this.dqrq_wj = getNowFormatDate();
  }
  onSubmit_wj() {
    console.log(this.wjformModel.value);
    let dat = this.wjformModel.value;
    dat['xjh'] = this.dqxs['xjh'];
    let myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/xsczjl_zjjl_add_wj", dat, { headers: myHeaders }).toPromise().then((response) => {
      let data = response.json();
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
    console.log(this.ryformModel.value);
    let dat = this.ryformModel.value;
    dat['xjh'] = this.dqxs['xjh'];
    let myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/xsczjl_zjjl_add_ry", dat, { headers: myHeaders }).toPromise().then((response) => {
      let data = response.json();
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
