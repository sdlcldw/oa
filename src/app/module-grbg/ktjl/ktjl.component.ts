import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../service/TskService';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { dateValidator } from '../../valldators/valldators';

@Component({
  selector: 'app-ktjl',
  templateUrl: './ktjl.component.html',
  styleUrls: ['./ktjl.component.css']
})




export class KtjlComponent implements OnInit {
kc_data;
kc_id='';

xsjl={
  kq:[],
  bz:[],
  xsid:[]
}

dqkcdata={};
formModel: FormGroup;

xj: number = 0;


yd=0;
sd=0;
qj=0;
kc=0;
cd=0;

ifaddktjl:boolean = false;


constructor(private fb: FormBuilder, private http: HttpClient, private tsk: TskService,private _localeService: BsLocaleService) {
    this.formModel = fb.group({
      sj: ['', [Validators.required,dateValidator]],
      ktqk: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    })
   }

  ngOnInit() {
    this.dqkcdata ={kc:''};
  this.getkc();
  this._localeService.use('zh-cn');   

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
  this.reset();
  this.http.post("/oa/basic/web/index.php?r=grbg/ktjl_get_kcmx",{id:this.kc_id}).toPromise().then((response) => {
    this.ifaddktjl = true;
    this.dqkcdata = response;
    this.formModel.patchValue({sj: new Date()});
    console.log(response);
    console.log(this.xsjl.kq);
    this.yd = this.dqkcdata['xs'].length;
  });
  setTimeout(()=>{
    for(let j = 0,len=this.dqkcdata['xs'].length; j < len; j++) {
    this.xsjl.bz[j]='';
  }},2000)
}
qbzc(){
  console.log(this.xsjl.kq);
    for(let j = 0,len=this.dqkcdata['xs'].length; j < len; j++) {
      this.xsjl.kq[j]=1;
    }
    console.log(this.xsjl.kq);
    this.yd = this.xsjl.kq.length;
    this.sd =this.yd;
    this.cd = 0; this.kc=0;this.qj=0;
}

kqtj(){
  this.qj = 0;
  this.cd = 0;
  this.kc = 0;
  for(let j = 0,len=this.xsjl.kq.length; j < len; j++) {
     if(this.xsjl.kq[j]==2){
        this.qj++;
     }else if(this.xsjl.kq[j]==3){
       this.cd++;
     }else if(this.xsjl.kq[j]==4){
       this.kc++;
     }
  }
  this.sd = this.yd-this.qj-this.cd-this.kc;
}
onSubmit(){ //学生考勤和备注、星级评定、时间和评语、课程信息
  if(this.xj == 0){
    this.tsk.tsk('星级评价不能为空');
    return;
  }
  for(let j = 0,len=this.dqkcdata['xs'].length; j < len; j++) {
    this.xsjl.xsid[j]=this.dqkcdata['xs'][j]['xsid'];
  }
  if(this.xsjl.xsid.length == this.xsjl.kq.length && this.xsjl.kq.length == this.xsjl.bz.length){
    
  }else{
    this.tsk.tsk('请检查考勤是否正确');
    return;
  }
  
  let data = {
    kcdata:this.dqkcdata['kc'],
    xsjl:this.xsjl,
    kqtj:{yd:this.yd,sd:this.sd,qj:this.qj,cd:this.cd,kc:this.kc},
    kcjl:this.formModel.value,
    xj:this.xj,
  }

  this.http.post("/oa/basic/web/index.php?r=grbg/ktjl_add",data).toPromise().then((response) => {
    if(response){
       this.tsk.cg('提交成功！');
       this.reset();
       this.ifaddktjl = false;
    }else{
      this.tsk.tsk('操作失败！')
    }
  });


}

reset(){
  this.xsjl={
    kq:[],
    bz:[],
    xsid:[]
  }
this.yd=0;
this.sd=0;
this.qj=0;
this.kc=0;
this.cd=0;
this.xj=0;
this.formModel.reset();
}

}
