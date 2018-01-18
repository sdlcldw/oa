import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import * as $ from 'jquery';
import jQuery from 'jquery';
import {FileUploader} from "ng2-file-upload";
import { Location } from '@angular/common';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { TskService } from '../service/TskService';
import { XsService } from '../service/XsService';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-index-xs',
  templateUrl: './index-xs.component.html',
  styleUrls: ['./index-xs.component.css']
})
export class IndexXsComponent implements OnInit {

  rs:number;
  height: number;
  menu_ul_height:number;
  userimage: string;
  ifleft:boolean=false;

  xsdata;


modalRef: BsModalRef;
modal_img_config = {
  animated: false,
  keyboard: true,
  backdrop: false,
  ignoreBackdropClick: false
};

constructor(private router: Router,private http:  HttpClient, private location: Location,private tsk:TskService,
            private ar:ActivatedRoute, private xsinfo:XsService,private modalService: BsModalService){ 
             
              this.height = $(window).height() - 100;
              this.menu_ul_height = $(window).height() - 100 - 232;
            }
  ngOnInit() {
      this.xsdata = this.xsinfo.getuserinfo();
      console.log(this.xsdata);
  }
  lefthide(){
    this.ifleft = !this.ifleft;
  }
  Logout() {
    this.http.get('/oa/basic/web/index.php?r=xsindex/logout').subscribe((data) => {
      if (data== 1) {
this.tsk.tsk('退出成功！')
        this.router.navigate(['login-xs'])
      }
    })
  }
  goBack(): void {
    this.location.back();
  }
}
