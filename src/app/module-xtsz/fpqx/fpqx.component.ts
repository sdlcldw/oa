import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http,Headers } from "@angular/http";
import { DataService } from '../DataService';


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

  constructor(public routeInfo: ActivatedRoute,public router:Router,private fb: FormBuilder,private http: Http,private datasv:DataService) { }

  ngOnInit() {
    console.log('进入到fpqx路由了');
    
    console.log(this.datasv.getfpqxdata());
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

  }
    

}


