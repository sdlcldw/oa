import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http,Headers } from "@angular/http";
import { DataService } from '../DataService';
import { TskService } from "app/service/TskService";


@Component({
  selector: 'app-fpqx',
  templateUrl: './fpqx.component.html',
  styleUrls: ['./fpqx.component.css']
})
export class FpqxComponent implements OnInit {

data;
public js: any;
myForm: FormGroup;

  rolesall: string[];
  ifroles:boolean[];
  permissionsall: string[];
  ifpermissions: boolean[];
  selects: string[] = [];

  constructor(public routeInfo: ActivatedRoute,public router:Router,private fb: FormBuilder,private http: Http,private datasv:DataService,private tsk:TskService) { }

  ngOnInit() {
    if (!this.datasv.getfpqxdata()){
      this.router.navigate(['index/xtsz/jslb']);
      return;
    }
    this.data= this.datasv.getfpqxdata();
    this.ifroles = this.data['ifsoles'];
    this.rolesall = this.data['rolesall'];
    this.ifpermissions = this.data['ifpermissions'];
    this.permissionsall = this.data['permissionsall'];
    
    console.log('进入到fpqx路由了');
    
    console.log(this.datasv.getfpqxdata());
    console.log('马上渲染表单')

    this.myForm = this.fb.group({
      roles: this.fb.array(this.ifroles),
      permissions: this.fb.array(this.ifpermissions),
    });

    // this.roles.valueChanges.subscribe(values => {
    //   let selects: string[] = [];
    //   values.forEach((selected: boolean ,i: number) => {
    //     selected === true && selects.push(this.rolesall[i]['name'])
    //   });
    //   this.selects = selects;
    //   console.log(this.roles); 
    // });
  }

  ok(){
    this.selects = [];
    this.roles.value.forEach((selected: boolean ,i: number) => {
      selected === true && this.selects.push(this.rolesall[i]['name'])
    });
    this.permissions.value.forEach((selected: boolean ,i: number) => {
      selected === true && this.selects.push(this.permissionsall[i]['name'])
    });

    let dat = {name:this.data.js,items:this.selects};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=rbac/add_child",dat, { headers: myHeaders }).toPromise().then((response) => {
      let data= response.json();
      if(data){
      this.tsk.cg('分配权限成功！');
    this.router.navigate(['index/xtsz/jslb']);
    }
  });
  }
  fh(){
    this.router.navigate(['index/xtsz/jslb']);    
  }
    get roles () {
      return this.myForm.get('roles');
    }
    get permissions () {
      return this.myForm.get('permissions');
    }
 
    

    

}


