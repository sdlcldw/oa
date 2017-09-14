import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';



@Component({
  selector: 'app-bmjbxx',
  styleUrls: ['./bmjbxx.component.css'],
  templateUrl: './bmjbxx.component.html',
})
export class BmjbxxComponent implements OnInit {
ifbj:boolean = true;
  formModel:FormGroup; 
 fb:FormBuilder = new FormBuilder();
 bms:Array<any>=[];
  constructor(private http:Http) {

    }

  ngOnInit() {
    this.formgj();
    this.getbm();
  }

  formgj(){
    this.formModel = this.fb.group({
      bms:this.fb.array(
        this.bms
      )
    })
   }

 getbm(){
  this.http.get('/oa/basic/web/index.php?r=xtsz/get_bm').map(res => res.json()).subscribe(data => {
    console.log(data)
     if(data){
this.bms = data;
this.formgj();
     }
  });
 }

   bj(){
    this.ifbj = false;
   }

   tcbj(){
    this.ifbj = true;
   }

  addbm(){
    let bms = this.formModel.get('bms') as FormArray;
    bms.push(new FormControl());
  }

  removebm(n) {
    let bms = this.formModel.get('bms') as FormArray;
    // let bmsarray:Array<any> =  bms.controls;
    　if(n<0){
    return
      }else{
    //  bms.controls = bmsarray.slice(0,n).concat(bmsarray.slice(n+1,bmsarray.length));
     bms.removeAt(n);
    }
    }
   tj(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/add_bm", this.formModel.value.bms, { headers: myHeaders }).toPromise().then((response) => {
       let data = response.json();
       if(data){
         alert("修改成功！");
         this.ifbj = true;
       }
  });
   }
}
