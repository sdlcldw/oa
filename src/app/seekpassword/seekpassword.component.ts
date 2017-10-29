import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Http,Headers } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { TskService } from 'app/service/TskService';


@Component({
  selector: 'app-seekpassword',
  templateUrl: './seekpassword.component.html',
  styleUrls: ['./seekpassword.component.css']
})
export class SeekpasswordComponent implements OnInit {

  formModel:FormGroup; 
  dataSource:Observable<any>;
  fb:FormBuilder = new FormBuilder();
    constructor(private router:Router,private http:Http,private tsk:TskService) {

      this.formModel = this.fb.group({
        username: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
        email: ['',[Validators.required,Validators.email]],
      })
    }

  ngOnInit() {
  }
  get username() { return this.formModel.get('username'); }
  get email() { return this.formModel.get('email'); }
onSubmit(){
  let data={
    username:this.formModel.value.username,
    email:this.formModel.value.email,
  }
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=index/seekpassword",data, { headers: myHeaders }).toPromise().then((response) => {
     let data = response.json();
    console.log(data);
    if(data==2){
      this.tsk.tsk('电子邮箱与用户不匹配！');
    }else{

    }
});
 }
}
