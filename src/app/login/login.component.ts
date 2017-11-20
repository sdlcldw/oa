import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Http,Headers } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import * as $ from 'jquery';
import { UserService } from 'app/service/UserService';
import { TskService } from 'app/service/TskService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel:FormGroup; 
dataSource:Observable<any>;
fb:FormBuilder = new FormBuilder();
imageurl;

  constructor(private http:Http,private router:Router,private userinfo:UserService,private tsk:TskService) {
    this.formModel = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
    })
  }

  ngOnInit(){
    let images=10; //图像总数量
    this.imageurl="assets/images/background_"+Math.floor(Math.random()*images+1)+".jpg";
  }

  get username() { return this.formModel.get('username'); }
  get password() { return this.formModel.get('password'); }
  
onSubmit(){
let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.dataSource = this.http.post('/oa/basic/web/index.php?r=index/login',$.param({'username':this.formModel.value.username,'password':this.formModel.value.password}),{headers:myHeaders})
    .map((res)=>res.json());
   this.dataSource.subscribe(data=>{
      console.log(data);
                if (data==2){
                            this.tsk.tsk('用户名或者密码错误!',3000);
                            return;
                        };
                        if (data==3){
                          this.tsk.tsk('后端数据验证失败！',3000);
                            return;
                        };
                           if (data['dl']=1 && data['zlyz']== 1){
                          this.router.navigate(['index']);
                            return;
                        }else if(data['dl']=1 && data['zlyz']== 2){
                          this.tsk.tsk('系统检测：基本信息填写不完整，请先完善个人资料！',8000);                          
                          this.router.navigate(['index/grbg/grzl']);
                          return;
                        }
                        alert('登录失败！data:0');
              }
    )
 }

}