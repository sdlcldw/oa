import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-sssz',
  templateUrl: './sssz.component.html',
  styleUrls: ['./sssz.component.css']
})
export class SsszComponent implements OnInit {

  getdata: Observable<any>;
  lydata;
  add_name;
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
  delly(){
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
  
  
  

}
