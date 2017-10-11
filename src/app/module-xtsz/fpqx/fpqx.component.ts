import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http,Headers } from "@angular/http";

@Component({
  selector: 'app-fpqx',
  templateUrl: './fpqx.component.html',
  styleUrls: ['./fpqx.component.css']
})
export class FpqxComponent implements OnInit {

public js: any;
public items = [{description:'1',name:''},{description:'2',name:''}];
myForm: FormGroup;

  likesArr: string[] = ['喜欢','不喜欢','非常喜欢','超级喜欢','喜欢得不得了'];
  likesif:boolean[] = [true,true,true,true,false];
  selects: string[] = [];

  constructor(public routeInfo: ActivatedRoute,public router:Router,private fb: FormBuilder,private http: Http,) { }

  ngOnInit() {
    this.js = this.routeInfo.snapshot.queryParams['data'];
    this.myForm = this.fb.group({
      likes: this.fb.array(this.likesif)
    });

    this.likes.valueChanges.subscribe(values => {
      let selects: string[] = [];
      values.forEach((selected: boolean ,i: number) => {
        selected === true && selects.push(this.likesArr[i])
      });
      this.selects = selects;
      console.log(this.likes); 
    });
  }

  ok(){
    // this.router.navigate(['index/xtsz/jslb']);
    this.likesArr = ['不喜欢','非常喜欢','超级喜欢','喜欢得不得了'];
  }
  
    get likes () {
      return this.myForm.get('likes');
    }
  getdata(){
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=rbac/get_item",this.js, { headers: myHeaders }).toPromise().then((response) => {
       this.items = response.json();
       console.log(this.items)
  });
  }
    

}


