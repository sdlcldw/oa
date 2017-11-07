import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-zwwh',
  templateUrl: './zwwh.component.html',
  styleUrls: ['./zwwh.component.css']
})
export class ZwwhComponent implements OnInit {
  iffpbm:boolean = false;
  myForm: FormGroup;
  zwdata;
  add_name;
  getdata: Observable<any>;
  dat;
  zw: string[];
  ifzw:boolean[];
  bm: string[];
  ifbm: boolean[];
  selects: string[] = [];

  
   constructor(private http:Http,private tsk:TskService,private fb: FormBuilder,){
    this.getdata = this.http.get('/oa/basic/web/index.php?r=xtsz/zwwh_get_zw').map(res => res.json())
  }

  ngOnInit() {
    this.getzw();
  }
  
  getzw(){
    this.getdata.subscribe(data => {
      if(data){
       this.zwdata= data;
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }

  addzw(){
    let dat = {name:this.add_name};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/zwwh_add_zw",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
         this.getzw();
      this.tsk.cg('添加成功！');         
       }else{
      this.tsk.tsk('添加失败！');         
       }
  });
  }
  delzw(data){
    let dat = {name:data};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/zwwh_del_zw",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.getzw();        
      this.tsk.cg('删除成功！');         
       }else{
      this.tsk.tsk('删除失败！');         
       }
  });
  }


  fpbm(data){
    this.dat = {name:data};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/zwwh_get_item",this.dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        console.log(data);
        this.zw = data.zw;
        this.ifzw = data.ifzw;
        this.bm = data.bm;
        this.ifbm = data.ifbm;
        this.iffpbm = true;
        this.myForm = this.fb.group({
          zws: this.fb.array(this.ifzw),
          bms: this.fb.array(this.ifbm),
        });

       }else{
      this.tsk.tsk('获取数据失败！');         
       }
  });
  }
  ok(){
    this.selects = [];
    this.zws.value.forEach((selected: boolean ,i: number) => {
      selected === true && this.selects.push(this.zw[i]['name'])
    });
    this.bms.value.forEach((selected: boolean ,i: number) => {
      selected === true && this.selects.push(this.bm[i]['name'])
    });

    let dat = {name:this.dat['name'],items:this.selects};
    console.log(dat);
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/zwwh_add_child",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
      if(data){
      this.tsk.cg('分配成功！');
    }
  });
  }

  qx(){
    this.iffpbm = false;
    this.zw = [];
    this.ifzw = [];
    this.bm = [];
    this.ifbm = [];
  }
  get zws () {
    return this.myForm.get('zws');
  }
  get bms () {
    return this.myForm.get('bms');
  }



}
