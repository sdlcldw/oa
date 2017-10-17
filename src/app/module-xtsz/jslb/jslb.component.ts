import { Component, OnInit } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { DataService } from '../DataService';
import { TskService } from "app/service/TskService";


@Component({
  selector: 'app-jslb',
  templateUrl: './jslb.component.html',
  styleUrls: ['./jslb.component.css']
})
export class JslbComponent implements OnInit {
data;
  constructor(private router: Router,private http:Http,private datasv: DataService,private tsk:TskService) { }

  ngOnInit() {
    this.http.get('/oa/basic/web/index.php?r=rbac/get_js') // (4)
    .map(res => res.json()) // (5)
    .subscribe(data => {
       if (data) this.data = data; // (6)
    });
  }
fpqx(js){
  let dat = {js:js};
  let myHeaders:Headers = new Headers();
  myHeaders.append("Content-Type","application/json; charset=UTF-8");
  this.http.post("/oa/basic/web/index.php?r=rbac/get_item",dat, { headers: myHeaders }).toPromise().then((response) => {
    let datas :any[]= response.json();
    datas['js'] = js;
     this.datasv.setfpqxdata(datas);
    //  console.log(this.datasv.getfpqxdata());
      this.router.navigate(['index/xtsz/fpqx']);
});
 
}
gxqxjd(){
  this.http.get('/oa/basic/web/index.php?r=rbacadd/init').subscribe(data => {
    if(data){
      this.tsk.cg('一键更新全部权限子节点操作成功！');
    }
 });
}
}
