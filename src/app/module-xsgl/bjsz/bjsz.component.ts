import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import jQuery from 'jquery';
import { TskService } from '../../service/TskService';
@Component({
  selector: 'app-bjsz',
  templateUrl: './bjsz.component.html',
  styleUrls: ['./bjsz.component.css']
})
export class BjszComponent implements OnInit {
  bjdata;
  dqnjb;
  ifdqnjb = false;
  add_name;
  getdata: Observable<any>;
  userdata;
  dqbj;
  ss_name;
  users;
   constructor(private http:Http,private tsk:TskService){
    this.getdata = this.http.get('/oa/basic/web/index.php?r=xsgl/bjsz_get_bj').map(res => res.json())
  }

  ngOnInit() {
    this.getbj();
  }
  
  getbj(){
    this.getdata.subscribe(data => {
      if(data){
        if(data[0] == '2'){
          this.tsk.tsk('没有权限访问',3000);
        }else{
       this.bjdata= data['bj'];
       this.dqnjb = data['dqnjb'];
       this.ifdqnjb = true;
       console.log(data);
      }
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }

  addbj(){
    let dat = {name:this.add_name,dqnjbid:this.dqnjb.Id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/bjsz_add_bj",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
         this.getbj();
      this.tsk.cg('添加成功！');         
       }else{
      this.tsk.tsk('添加失败！');         
       }
  });
  }
  // delbj(data){
  //   let dat = {id:data};
  //   let myHeaders:Headers = new Headers();
  //   myHeaders.append("Content-Type","application/json; charset=UTF-8");
  //   this.http.post("/oa/basic/web/index.php?r=xsgl/bjsz_del_bj",dat, { headers: myHeaders }).toPromise().then((response) => {
  //     let data= response.json();
  //      if(data){
  //       this.getbj();        
  //     this.tsk.cg('删除成功！');         
  //      }else{
  //     this.tsk.tsk('删除失败！');         
  //      }
  // });
  // }
  

  bzrsz(Id){
    this.http.get('/oa/basic/web/index.php?r=xsgl/bjsz_get_users').map(res => res.json()).subscribe(data => {
      if(data){
      this.dqbj = Id;
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
  swbzr(data){
    let dat = {userid:data,bjid:this.dqbj.Id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/bjsz_bj_swbzr",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data == '3'){
    $('#qxant').click();    
        this.getbj();        
      this.tsk.cg('设置成功！');
       }else{
      this.tsk.tsk('操作失败！');         
       }
  });
  }
  
  
  

}
