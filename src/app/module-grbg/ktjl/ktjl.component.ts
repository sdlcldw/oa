import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../service/TskService';
@Component({
  selector: 'app-ktjl',
  templateUrl: './ktjl.component.html',
  styleUrls: ['./ktjl.component.css']
})
export class KtjlComponent implements OnInit {
kc_data;
kc_id;
kq=[];
dqkcdata={};

  constructor(fb: FormBuilder, private http: HttpClient, private tsk: TskService) {

   }

  ngOnInit() {
    this.dqkcdata ={kc:''};
  this.getkc();
  }

getkc(){
  this.http.get('/oa/basic/web/index.php?r=grbg/ktjl_get_kc').subscribe(data => {
    if (data) {
      if(data == 2){
        this.tsk.tsk('你当前没有进行中的校本课程！',5000)
      }else{
      this.kc_data= data;
    }}
  });
}
xzkc(){
  if(!this.kc_id){
    this.tsk.tsk('请选择课程');
    return;
  }
  this.kq = [];
  this.http.post("/oa/basic/web/index.php?r=grbg/ktjl_get_kcmx",{id:this.kc_id}).toPromise().then((response) => {
    this.dqkcdata = response;
    console.log(response);
  });
}
cs(){
  console.log(this.kq)
}

}
