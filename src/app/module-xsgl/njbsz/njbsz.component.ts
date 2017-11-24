import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import jQuery from 'jquery';

@Component({
  selector: 'app-njbsz',
  templateUrl: './njbsz.component.html',
  styleUrls: ['./njbsz.component.css']
})
export class NjbszComponent implements OnInit {
  njbdata;
  add_name;
  getdata: Observable<any>;
  userdata;
  dqnjb;
  ss_name;
  users;
   constructor(private http:Http,private tsk:TskService){
    this.getdata = this.http.get('/oa/basic/web/index.php?r=xsgl/jcxxsz_get_njb').map(res => res.json())
  }

  ngOnInit() {
    this.getnjb();
  }
  
  getnjb(){
    this.getdata.subscribe(data => {
      if(data){
       this.njbdata= data;
       console.log(data);
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }

  addnjb(){
    let dat = {name:this.add_name};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_add_njb",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
         this.getnjb();
      this.tsk.cg('添加成功！');         
       }else{
      this.tsk.tsk('添加失败！');         
       }
  });
  }
  delnjb(data){
    let dat = {id:data};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_del_njb",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.getnjb();        
      this.tsk.cg('删除成功！');         
       }else{
      this.tsk.tsk('删除失败！');         
       }
  });
  }
  

  fzrsz(Id){
    this.http.get('/oa/basic/web/index.php?r=xsgl/jcxxsz_get_users').map(res => res.json()).subscribe(data => {
      if(data){
      this.dqnjb = Id;
      this.userdata= data;
      this.users = data;
    $('#openfzrsz').click();    
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }
  ssyh(){
    let data = new Array();
    for(var i=0;i<this.userdata.length;i++){
     if(this.userdata[i]['username'].indexOf(this.ss_name) > -1){
      data.push(this.userdata[i]);
     }
     }
     console.log(data);
     if(data){
       this.users = data;
       console.log(data)
     }else{
       this.tsk.tsk('未查到结果!')
     }
  }
  swfzr(data){
    let dat = {userid:data,njbid:this.dqnjb.Id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_njb_swfzr",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
    $('#qxant').click();    
        this.getnjb();        
      this.tsk.cg('设置成功！');         
       }else{
      this.tsk.tsk('操作失败！');         
       }
  });
  }
  swgly(data){
    let dat = {userid:data,njbid:this.dqnjb.Id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_njb_swgly",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
    $('#qxant').click();    
        this.getnjb();        
      this.tsk.cg('设置成功！');         
       }else{
      this.tsk.tsk('操作失败！');         
       }
  });
  }
  

}
