import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fpqx',
  templateUrl: './fpqx.component.html',
  styleUrls: ['./fpqx.component.css']
})
export class FpqxComponent implements OnInit {
public data: any;
myForm: FormGroup;

  likesArr: string[] = ['喜欢','不喜欢','非常喜欢','超级喜欢','喜欢得不得了'];

  selects: string[] = ['喜欢'];


  constructor(public routeInfo: ActivatedRoute,public router:Router,private fb: FormBuilder) { }

  ngOnInit() {
    this.data = this.routeInfo.snapshot.queryParams['data'];

    this.myForm = this.fb.group({
      likes: this.fb.array([true, false, false, false, false])})
      
      this.likes.valueChanges.subscribe(values => {
        let selects: string[] = [];
        values.forEach((selected: boolean ,i: number) => {
          selected === true && selects.push(this.likesArr[i])
        });
        this.selects = selects;
      });
  }

  ok(){
    this.router.navigate(['index/xtsz/jslb']);
  }
  
    get likes () {
      return this.myForm.get('likes');
    }
  
    

}


