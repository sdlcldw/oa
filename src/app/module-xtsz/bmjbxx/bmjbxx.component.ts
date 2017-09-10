import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';



@Component({
  selector: 'app-bmjbxx',
  templateUrl: './bmjbxx.component.html',
  styleUrls: ['./bmjbxx.component.css']
})
export class BmjbxxComponent implements OnInit {


  formModel:FormGroup; 
 fb:FormBuilder = new FormBuilder();
 bms:Array<any> = ['123','2','3','4','5','6','7','8','9'];



  constructor(private http:Http) {

    }

  ngOnInit() {
    this.formgj();
  }

  formgj(){
    this.formModel = this.fb.group({
      bms:this.fb.array(
        this.bms
      )
    })
   }

  addbm(){
    let bms = this.formModel.get('bms') as FormArray;
    bms.push(new FormControl());
  }

  qx(){
    this.formgj();
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
    this.http.post("/oa/basic/web/index.php?r=index/add", this.formModel.value.bms, { headers: myHeaders }).toPromise().then((response) => {
      console.log(response.json());
  });
   }
}
