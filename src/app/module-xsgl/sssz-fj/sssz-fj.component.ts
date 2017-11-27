import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http,Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sssz-fj',
  templateUrl: './sssz-fj.component.html',
  styleUrls: ['./sssz-fj.component.css']
})
export class SsszFjComponent implements OnInit {
  
  
    public data: any;
    fjdata;
    add_name;
    del_fjid;
    constructor( public activeRoute:ActivatedRoute,private http:Http,private tsk:TskService) { }
  
    ngOnInit() {
      this.activeRoute.queryParams.subscribe(params => {
        this.data = params;
        console.log(this.data);
    })
  
   this.getfj();
  }
  getfj(){
    let dat = {id:this.data.lc_id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_get_fj",dat, { headers: myHeaders }).map(res => res.json()).subscribe(data => {
      if(data){
        this.fjdata = data;
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }
  
  addfj(){
    let dat = {name:this.add_name,lc_id:this.data.lc_id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_add_fj",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.tsk.cg('添加成功！');
        this.getfj();
       }else{
      this.tsk.tsk('操作失败！');
       }
  });
  }
  delfj(){
    if (confirm('该操作会将该楼层下包含的所有数据都会删除！确认删除吗？')!=true){
      return; 
     }
    let dat = {id:this.del_fjid};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_del_fj",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.getfj();        
      this.tsk.cg('删除成功！');         
       }else{
      this.tsk.tsk('删除失败！');         
       }
  });
  }
  
  }
  