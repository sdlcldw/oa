import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TskService } from '../../service/TskService';

@Component({
  selector: 'app-sssz-lc',
  templateUrl: './sssz-lc.component.html',
  styleUrls: ['./sssz-lc.component.css']
})
export class SsszLcComponent implements OnInit {


  public lydata: any;
  lcdata;
  add_name;
  del_lcid;
  constructor( public activeRoute:ActivatedRoute,private http:Http,private tsk:TskService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.lydata = params;
      console.log(this.lydata);
  })

 this.getlc();
}
getlc(){
  let dat = {id:this.lydata.Id};
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/sssz_get_lc",dat, { headers: myHeaders }).map(res => res.json()).subscribe(data => {
    if(data){
      this.lcdata = data;
    }else{
     this.tsk.tsk('没有获取到数据！');
    }
 });
}

addlc(){
  let dat = {name:this.add_name,ly_id:this.lydata.Id};
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/sssz_add_lc",dat, { headers: myHeaders }).toPromise().then((response) => {
    let data= response.json();
     if(data){
      this.tsk.cg('添加成功！');
      this.getlc();
     }else{
    this.tsk.tsk('操作失败！');
     }
});
}
dellc(){
  if (confirm('该操作会将该楼层下包含的所有数据都会删除！确认删除吗？')!=true){
    return; 
   }
  let dat = {id:this.del_lcid};
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=xsgl/sssz_del_lc",dat, { headers: myHeaders }).toPromise().then((response) => {
    let data= response.json();
     if(data){
      this.getlc();        
    this.tsk.cg('删除成功！');         
     }else{
    this.tsk.tsk('删除失败！');         
     }
});
}

}
