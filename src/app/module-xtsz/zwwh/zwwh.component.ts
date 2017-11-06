import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-zwwh',
  templateUrl: './zwwh.component.html',
  styleUrls: ['./zwwh.component.css']
})
export class ZwwhComponent implements OnInit {

  zwdata;
  add_name;
  getdata: Observable<any>;
   constructor(private http:Http,private tsk:TskService){
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

}
