import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bmwh',
  templateUrl: './bmwh.component.html',
  styleUrls: ['./bmwh.component.css']
})
export class BmwhComponent implements OnInit {
  bmdata;
  add_name;
  getdata: Observable<any>;
   constructor(private http:Http,private tsk:TskService){
    this.getdata = this.http.get('/oa/basic/web/index.php?r=xtsz/bmwh_get_bm').map(res => res.json())
  }

  ngOnInit() {
    this.getbm();
  }
  
  getbm(){
    this.getdata.subscribe(data => {
      if(data){
       this.bmdata= data;
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }

  addbm(){
    let dat = {name:this.add_name};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/bmwh_add_bm",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
         this.getbm();
      this.tsk.cg('添加成功！');         
       }else{
      this.tsk.tsk('添加失败！');         
       }
  });
  }
  delbm(data){
    let dat = {name:data};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/bmwh_del_bm",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.getbm();        
      this.tsk.cg('删除成功！');         
       }else{
      this.tsk.tsk('删除失败！');         
       }
  });
  }

}
