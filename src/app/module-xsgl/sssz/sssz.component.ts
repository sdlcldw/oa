import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import jQuery from 'jquery';
@Component({
  selector: 'app-sssz',
  templateUrl: './sssz.component.html',
  styleUrls: ['./sssz.component.css']
})
export class SsszComponent implements OnInit {

  getdata: Observable<any>;
  lydata;
  add_name;
  if_ly:boolean;
  if_lc:boolean;
  if_fj:boolean;
  del_lyid;
   constructor(private http:Http,private tsk:TskService){
    this.getdata = this.http.get('/oa/basic/web/index.php?r=xsgl/jcxxsz_get_ly').map(res => res.json())
  }

  ngOnInit() {
    this.getly();
  }
  
  getly(){
    this.getdata.subscribe(data => {
      if(data){
       this.lydata= data;
       console.log(data);
       this.if_ly=true;
      }else{
       this.tsk.tsk('没有获取到数据！');
      }
   });
  }

  addly(){
    let dat = {name:this.add_name};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_add_ly",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
         this.getly();
      this.tsk.cg('添加成功！');         
       }else{
      this.tsk.tsk('添加失败！');         
       }
  });
  }
  delly(data){
    if (confirm('该操作会将该楼宇下包含的所有数据都会删除！确认删除吗？')!=true){ 
      return; 
     }
    let dat = {id:this.del_lyid};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_del_ly",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
       if(data){
        this.getly();        
      this.tsk.cg('删除成功！');         
       }else{
      this.tsk.tsk('删除失败！');         
       }
  });
  }
  golc(id){
    console.log(id);
  }
  

  // bzrsz(Id){
  //   this.http.get('/oa/basic/web/index.php?r=xsgl/jcxxsz_get_users').map(res => res.json()).subscribe(data => {
  //     if(data){
  //     this.dqbj = Id;
  //     this.userdata= data;
  //     this.users = data;
  //   $('#openfzrsz').click();    
  //     }else{
  //      this.tsk.tsk('没有获取到数据！');
  //     }
  //  });
  // }
  // ssyh(){
  //   let data = new Array();
  //   for(var i=0;i<this.userdata.length;i++){
  //    if(this.userdata[i]['username'].indexOf(this.ss_name) > -1){
  //     data.push(this.userdata[i]);
  //    }
  //    }
  //    console.log(data);
  //    if(data){
  //      this.users = data;
  //      console.log(data)
  //    }else{
  //      this.tsk.tsk('未查到结果!')
  //    }
  // }
  // swbzr(data){
  //   let dat = {userid:data,bjid:this.dqbj.Id};
  //   let myHeaders:Headers = new Headers();
  //   myHeaders.append("Content-Type","application/json; charset=UTF-8");
  //   this.http.post("/oa/basic/web/index.php?r=xsgl/jcxxsz_bj_swbzr",dat, { headers: myHeaders }).toPromise().then((response) => {
  //     let data= response.json();
  //      if(data){
  //   $('#qxant').click();    
  //       this.getbj();        
  //     this.tsk.cg('设置成功！');         
  //      }else{
  //     this.tsk.tsk('操作失败！');         
  //      }
  // });
  // }
  
  
  

}
