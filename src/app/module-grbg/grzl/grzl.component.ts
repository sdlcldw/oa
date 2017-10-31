import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/service/UserService';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-grzl',
  templateUrl: './grzl.component.html',
  styleUrls: ['./grzl.component.css']
})
export class GrzlComponent implements OnInit {
  formModel:FormGroup; 
  dataSource:Observable<any>;
  fb:FormBuilder = new FormBuilder();

  constructor(private http:Http,private router:Router,private userinfo:UserService) { }

  ngOnInit() {
    this.formModel = this.fb.group({
      username: [''],
      sfzhm: [''],
      email: ['',[Validators.required, Validators.email]],
      sex: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      phone: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      phone_d: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      phone_bg: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      xk: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
    })
  }












  }


