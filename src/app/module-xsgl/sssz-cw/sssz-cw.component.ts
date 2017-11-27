import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http,Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sssz-cw',
  templateUrl: './sssz-cw.component.html',
  styleUrls: ['./sssz-cw.component.css']
})
export class SsszCwComponent implements OnInit {
  
  
    public data: any;
    cwdata;
    add_name;
    del_cwid;
    constructor( public activeRoute:ActivatedRoute,private http:Http,private tsk:TskService) { }
    ngOnInit() {
      this.activeRoute.queryParams.subscribe(params => {
        this.data = params;
        console.log(this.data);
    })
   this.getcw();
  }
  getcw(){
    let dat = {id:this.data.fj_id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_get_cw",dat, { headers: myHeaders }).map(res => res.json()).subscribe(data => {
      if(data){
        this.cwdata = data;
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }
  
  addcw(){
    let dat = {name:this.add_name,fj_id:this.data.fj_id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_add_cw",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.tsk.cg('添加成功！');
        this.getcw();
       }else{
      this.tsk.tsk('操作失败！');
       }
  });
  }
  delcw(){
    if (confirm('该操作会将该楼层下包含的所有数据都会删除！确认删除吗？')!=true){
      return; 
     }
    let dat = {id:this.del_cwid};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_del_cw",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.getcw();        
      this.tsk.cg('删除成功！');         
       }else{
      this.tsk.tsk('删除失败！');         
       }
  });
  }
  
  }
  