import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import * as $ from 'jquery';
import 'rxjs/Rx';
import { UserService } from "../../service/UserService";
import { TskService } from 'app/service/TskService';



@Component({
  selector: 'app-cjxs',
  templateUrl: './cjxs.component.html',
  styleUrls: ['./cjxs.component.css']
})
export class CjxsComponent implements OnInit {
  formModel: FormGroup;
  yzmdata: Observable<any>;
  fsdata: Observable<any>;
  imageurl = "/oa/basic/web/lcedu/loading20.gif";
  txan:boolean = true;

  constructor(fb: FormBuilder, private http: Http, private router: Router,private user:UserService,private tsk: TskService) { 
    this.formModel = fb.group({
      yhzh: ['2014371502003720086', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]],
      yhmm: ['123456', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      yzm: ['1234', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })

    this.yzmdata = this.http.get('/oa/basic/web/index.php?r=index/lcedu_yzm').map((res) => res.json());

  }

  ngOnInit() {
     this.newyzm();
  }

  newyzm() {
    this.yzmdata.subscribe((data) => {
      if (data == 1) {
        let userid = this.user.getuserinfo()['userid'];
        this.imageurl = "/oa/basic/web/lcedu/" + userid + ".jpg?" + Math.random();
        return;
      }
      this.tsk.tsk('连接教育局网站失败！',3000);
      return;
    })

  }
   wjmm = function () {
    this.tsk.tsk('市教育局网站：若忘记密码请考生本人或家长持户口本、学生证到县区普教科办理密码重置手续。',3000);
  }

  onSubmit() {
    console.log("chaxun运行啦");
    $("#name").empty();
    $("#fenshu").empty();
    let myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    this.fsdata = this.http.post('/oa/basic/web/index.php?r=index/lcedu_cf', $.param({ 'yhzh': this.formModel.value.yhzh, 'yhmm': this.formModel.value.yhmm, 'yzm': this.formModel.value.yzm }), { headers: myHeaders })
      .map((res) => res.json());
    this.fsdata.subscribe(data => {
      console.log(data);
      if (data == 2) {
        this.tsk.tsk('连接教育局网站错误！',3000);
        return;
      }
      if (data.html.indexOf("重新登录") > 0) {
        this.tsk.tsk('用户名、密码或验证码错误，请重新输入！',3000);
        return;
      }
      let zy;
      if (data.zy == 1) { zy = '一志愿' } else if (data.zy == 2) { zy = '二志愿' } else { zy = '未报志愿' };
      $("#name").append('姓名：<font color="#0066CD">' + data.name + '</font><span style="margin-left:123px;">中考志愿：<font color="#0066CD">' + zy + '</font></span>');
      $("#fenshu").append(data.html);
    this.txan = false;      
      this.newyzm();
    })
  }

  txxx(){
    
  }

}

