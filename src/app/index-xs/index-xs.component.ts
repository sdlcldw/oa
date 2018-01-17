import { Component, OnInit } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import * as $ from 'jquery';
import jQuery from 'jquery';
import {FileUploader} from "ng2-file-upload";
import { Location } from '@angular/common';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { TskService } from '../service/TskService';
import { UserService } from '../service/UserService';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-index-xs',
  templateUrl: './index-xs.component.html',
  styleUrls: ['./index-xs.component.css']
})
export class IndexXsComponent implements OnInit {

  zxrs: Observable<any>;
  rs:number;
  height: number;
  menu_ul_height:number;
  userimage: string;
  xsdata;
  model: any;
  modelt:any;

  ifsczp:boolean = false;

  modeldata;

  ymm;
  xmm;
  qrxmm;

  qx;

imgfile;
ifleft:boolean=false;

public uploader: FileUploader = new FileUploader({
  url: "/oa/basic/web/index.php?r=jssczp/uploadfile",
  method: "POST",
  itemAlias: "uploadedfile",
  removeAfterUpload: true,
  autoUpload: true,
});

modalRef: BsModalRef;
modal_img_config = {
  animated: false,
  keyboard: true,
  backdrop: false,
  ignoreBackdropClick: false
};

constructor(private router: Router,private httpw:  HttpClient, private http: Http, private location: Location,private tsk:TskService,
            private ar:ActivatedRoute, private userinfo:UserService,private modalService: BsModalService){ 

              this.height = $(window).height() - 100;
              this.menu_ul_height = $(window).height() - 100 - 232;
            }

  ngOnInit() {




  }

  lefthide(){
    this.ifleft = !this.ifleft;
  }

}
