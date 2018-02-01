import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../../service/TskService';
@Component({
  selector: 'app-dcwj',
  templateUrl: './dcwj.component.html',
  styleUrls: ['./dcwj.component.css']
})
export class DcwjComponent implements OnInit {
  formModel:FormGroup; 
  fb:FormBuilder = new FormBuilder();
  constructor(private http:HttpClient,private tsk:TskService) {
    this.formModel = this.fb.group({
      ssb: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    })
  }

  ngOnInit() {
      
  }
  
  get ssb() { return this.formModel.get('ssb'); }
  onSubmit(){
    if (window.confirm('内容填写好了吗？24小时内只能提交一次，确定提交吗?')) {
    this.http.post("/oa/basic/web/index.php?r=index/home_ssb", {'nr':this.formModel.value.ssb}).toPromise().then((response) => {
      if(response['zt'] == '2'){
        this.tsk.tsk("你上次提交时间为："+response['sj']+"，请24小时后再提交" );
      }else if(response == '1'){
        this.formModel.reset();
        this.tsk.cg("提交成功，谢谢！。" );
      }
    });
    }
  }
}