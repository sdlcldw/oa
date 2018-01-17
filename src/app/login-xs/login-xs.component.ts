import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { TskService } from '../service/TskService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-xs',
  templateUrl: './login-xs.component.html',
  styleUrls: ['./login-xs.component.css']
})
export class LoginXsComponent implements OnInit {
  formModel:FormGroup; 
  dataSource:Observable<any>;
  fb:FormBuilder = new FormBuilder();
  imageurl;
  imagegh;
  passwd='';
  passwdt='';
  constructor(private http:HttpClient,private router:Router,private tsk:TskService) {
    this.formModel = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(18)]],
      password: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(24)]],
    })
    //定制密码框
   this.password.valueChanges.subscribe( e => {
     if(this.passwd.length != this.passwdt.length){
       if(this.passwd.length == 0){
        this.passwdt = '';
       }
       if(this.passwd.length < this.passwdt.length){
        this.passwdt = this.passwdt.substring(0,this.passwdt.length - 1);//删除    
       }else{
       this.passwdt = this.passwdt + this.passwd.substring(this.passwdt.length);//增加
       }
     }
     this.passwd = this.passwd.replace(/./g,'●');
    });
  }

  ngOnInit() {
    let images=13; //图像总数量
    let imagegh = Math.floor(Math.random()*images+1);
    if(imagegh == this.imagegh){
    imagegh = Math.floor(Math.random()*images+1);
    }else{
      this.imagegh = imagegh;
      this.imageurl="http://oj6yy14e0.bkt.clouddn.com/background_"+imagegh+".jpg?imageslim";      
    }
  }
  get username() { return this.formModel.get('username'); }
  get password() { return this.formModel.get('password'); }

  onSubmit(){
    this.http.post("/oa/basic/web/index.php?r=xsindex/login", {'username':this.formModel.value.username,'password':this.passwdt}).toPromise().then((response) => {
      let data = response;
 console.log(data)
    });
        
    }
}
