import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Component({
  selector: 'app-jsgl',
  templateUrl: './jsgl.component.html',
  styleUrls: ['./jsgl.component.css']
})
export class JsglComponent implements OnInit {

  data = {
    name:'',
    description:'',
    rule_name:'',
    data:''
  }

  constructor(private http: Http) { }

  ngOnInit() {
  }
  add(){
    console.log(this.data);
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=rbac/add_js",this.data, { headers: myHeaders }).toPromise().then((response) => {
      if(response){
        alert('添加成功');
        this.qx();
      }
      console.log(response);
       
  });
  }
  qx(){
    this.data = {
      name:'',
      description:'',
      rule_name:'',
      data:''
    }
  }

}
