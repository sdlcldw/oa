import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../service/TskService';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-jkpj',
  templateUrl: './jkpj.component.html',
  styleUrls: ['./jkpj.component.css']
})
export class JkpjComponent implements OnInit {kc_data;
  kc_id ='';
  
  formModel: FormGroup;
  
  xj: number = 0;
  dqkcdata;
  
  constructor(private fb: FormBuilder, private http: HttpClient, private tsk: TskService,private _localeService: BsLocaleService) {
      this.formModel = fb.group({
        sj: ['', [Validators.required]],
        ktqk: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      })
     }
  
    ngOnInit() {
    this.getkc();
    this._localeService.use('zh-cn');
    }
  
  
  getkc(){
    this.http.get('/oa/basic/web/index.php?r=grbg/jkpj_get_kc').subscribe(data => {
      if (data) {
        if(data == 2){
          this.tsk.tsk('你当前没有符合结课评价条件的课程！',5000)
        }else{
        this.kc_data= data;
      }}
    });
  }

  xzkc(){
    this.http.post("/oa/basic/web/index.php?r=grbg/jkpj_get_kcmx",{id:this.kc_id}).toPromise().then((response) => {
      this.dqkcdata = response;
      console.log(response);
    });
  }
  
  
  }
  