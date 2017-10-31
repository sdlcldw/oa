import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/service/UserService';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Http,Headers } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { TskService } from 'app/service/TskService';

@Component({
  selector: 'app-grzl',
  templateUrl: './grzl.component.html',
  styleUrls: ['./grzl.component.css']
})
export class GrzlComponent implements OnInit {


  formModel:FormGroup; 
  dataSource:Observable<any>;
  fb:FormBuilder = new FormBuilder();

  constructor(private http:Http,private router:Router,private userinfo:UserService,private tsk:TskService) {
    let userinf = this.userinfo.getuserinfo().userinfo;
    this.formModel = this.fb.group({
      username: {value: userinf.username, disabled: true},
      sfzhm: [userinf.sfzh,[Validators.maxLength(18)]],
      email: [userinf.email,[Validators.required, Validators.email]],
      sex: [userinf.sex,[Validators.required]],
      phone: [userinf.phone,[Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      phone_d: [userinf.phone_d,[Validators.required, Validators.minLength(6), Validators.maxLength(11)]],
      phone_bg: [userinf.phone_bg,[Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      xk: [userinf.xk,[Validators.required,Validators.maxLength(24)]],
    })
   }
   get email() { return this.formModel.get('email'); }
   get sfzhm() { return this.formModel.get('sfzhm'); }
   get phone() { return this.formModel.get('phone'); }
   get phone_d() { return this.formModel.get('phone_d'); }
   get phone_bg() { return this.formModel.get('phone_bg'); }
   get xk() { return this.formModel.get('xk'); }
   

  ngOnInit() {
 
  }



  onSubmit(){
   let myHeaders:Headers = new Headers();
   myHeaders.append("Content-Type","application/json; charset=UTF-8");
   this.http.post("/oa/basic/web/index.php?r=grbg/grzl_set",this.formModel.value, { headers: myHeaders }).toPromise().then((response) => {
      let data = response.json();
      if(data == 1){
      this.tsk.cg('个人资料修改成功');
      this.router.navigate(['index/home']);
     }else{
      console.log('未做修改');
     }
 });
     }










  }


