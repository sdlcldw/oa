import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Http,Headers } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 formModel:FormGroup;
 dataSource:Observable<any>;
//  data:Array<any>;
  constructor(fb: FormBuilder,private http:Http,private router:Router) {
    this.formModel = fb.group({
      username: ['刘大旺',[Validators.required,Validators.minLength(2),Validators.maxLength(8)]],
      password: ['123',[Validators.required,Validators.minLength(6),Validators.maxLength(24)]]
    })
    
  }
  ngOnInit() {

  }
onSubmit(){
let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=index/login',$.param({'username':this.formModel.value.username,'password':this.formModel.value.password}),{headers:myHeaders})
    .map((res)=>res.json());
   console.log($.param(this.formModel.value));
   this.dataSource.subscribe(data=>{
                console.log(data);
                if (data==2){
                            alert('用户名或者密码错误!');
                            return;
                        };
                        if (data==3){
                            alert('后端数据验证失败！');
                            return;
                        };
                           if (data['dl']=1){
                    console.log(data);
                  $.cookie("qx", data['qx']);
                  console.log("我的权限是："+$.cookie("qx"));
                          this.router.navigate(['index']);
                            return;
                        };
                        alert('登录失败！data:0');
              }
    )
 }
}
