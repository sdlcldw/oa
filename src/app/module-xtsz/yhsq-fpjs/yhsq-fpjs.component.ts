import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http,Headers } from "@angular/http";
import { DataService } from '../DataService';
import { TskService } from "app/service/TskService";


@Component({
  selector: 'app-yhsq-fqjs',
  templateUrl: './yhsq-fpjs.component.html',
  styleUrls: ['./yhsq-fpjs.component.css']
})
export class YhsqFpjsComponent implements OnInit {
  data;
  public js: any;
  myForm: FormGroup;
  
    assignmentall: string[];
    ifassignment:boolean[];

    selects: string[] = [];
  constructor(public routeInfo: ActivatedRoute,public router:Router,private fb: FormBuilder,private http: Http,private datasv:DataService,private tsk:TskService) {
  
  }
  
    ngOnInit() {
  
      this.data= this.datasv.getfpjsdata();
      console.log(this.data);
      this.ifassignment = this.data['ifassignment'];
      this.assignmentall = this.data['assignmentall'];
      
  
      this.myForm = this.fb.group({
        assignment: this.fb.array(this.ifassignment),
      });
    }
  
    ok(){
      this.selects = [];
      this.assignment.value.forEach((selected: boolean ,i: number) => {
        selected === true && this.selects.push(this.assignmentall[i]['name'])
      });
  console.log(this.selects);
      let dat = {id:this.data.user.Id,assignment:this.selects};
      let myHeaders:Headers = new Headers();
      myHeaders.append("Content-Type","application/json; charset=UTF-8");
      this.http.post("/oa/basic/web/index.php?r=rbac/add_assignment",dat, { headers: myHeaders }).toPromise().then((response) => {
        // let data= response.json();
        if(response){
        this.tsk.cg('分配角色成功！');
      this.router.navigate(['index/xtsz/yhsq']);
      }
    });
    }
    fh(){
      this.router.navigate(['index/xtsz/yhsq']);
    }
      get assignment () {
        return this.myForm.get('assignment');
      }
  }
