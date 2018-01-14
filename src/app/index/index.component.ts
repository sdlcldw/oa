import { Component, OnInit, AfterViewInit ,TemplateRef} from '@angular/core';
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
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  zxrs: Observable<any>;
  rs:number;
  xsgl: boolean;
  zcgl: boolean;
  grbg: boolean;
  rsgl: boolean;
  cwpt: boolean;
  xtsz: boolean;  
  zhxz: boolean;  
  height: number;
  menu_ul_height:number;
  userimage: string;
userdata;
  menu_title = "个人办公";

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
            private ar:ActivatedRoute, private userinfo:UserService,private modalService: BsModalService) {
  this.zxrs = this.http.get('/oa/basic/web/index.php?r=index/up_time').map((res) => res.json());
    this.height = $(window).height() - 100;
    this.menu_ul_height = $(window).height() - 100 - 232;
  }
  ngOnInit() {
    this.ar.data.subscribe((data=>{
      this.userdata = data.info.userinfo;
      this.qx = data.info.qx;
    
      this.userimage = "assets/images/jsimg/" + this.userdata.Id + ".jpg?" + Math.random();
      this.modeldata = this.userdata;
    }))

    this.uploader.onBuildItemForm = () => {
      this.ifsczp = true;    
    };
    this.uploader.onCompleteItem = (item, response, status, headers) =>{
      if (status == 200) {
            if (response == '2') {
              this.tsk.cg('上传成功！');
      this.userimage = "assets/images/jsimg/" + this.userdata.Id + ".jpg?" + Math.random();
            } else {
              alert(response);
            }
          } else {
            alert("上传失败");
          }
          this.ifsczp = false;
    };
    this.grbg = true;

    this.zxrsdata();
    setInterval(() => { this.zxrsdata() }, 2000 * 60);
}
    // 回退
    goBack(): void {
      this.location.back();
    }

    openimgmodal(template: TemplateRef<any>) { 
      this.modalRef = this.modalService.show(template,Object.assign({}, this.modal_img_config, { class: 'modal-xsimg' }));
    }

  //照片上传
    zpsc(){
      document.getElementById('upload_jszp').click();
    }

  zxrsdata() {
    this.zxrs.subscribe((data) => {
      this.rs = data;
    })
  }

  changeleft(name) {
    if(name != 'grbg' && this.qx.indexOf(name+'/') == -1 ){
      this.tsk.tsk('对不起，您的权限不足！');
      return;
  }else{
    this.xsgl = false;
    this.zcgl = false;
    this.grbg = false;
    this.rsgl = false;
    this.cwpt = false;
    this.xtsz = false;
    this.zhxz = false;
    
  
    if (name == 'xsgl') {
      this.xsgl = true;
      this.menu_title = '学生管理';
    } else if (name == 'zcgl') {
      this.zcgl = true;
      this.menu_title = '资产管理';      
    } else if (name == 'grbg') {
      this.grbg = true;
      this.menu_title = '个人办公';
    } else if (name == 'rsgl') {
      this.rsgl = true;
      this.menu_title = '人事管理';
    } else if (name == 'cwpt') {
      this.cwpt = true;
      this.menu_title = '财务平台';
    }else if (name == 'xtsz') {
      this.xtsz = true;
      this.menu_title = '系统设置'; 
    }else if (name == 'zhxz') {
      this.zhxz = true;
      this.menu_title = '综合行政'; 
    }
   }
  }
  Logout() {
    this.http.get('/oa/basic/web/index.php?r=index/logout').subscribe((data) => {
      if (data.json() == 1) {
this.tsk.tsk('退出成功！')
        this.router.navigate(['login'])
      }
    })
  }
  submit() {
    var creds = 'sex=' + this.modeldata.sex + "&email=" + this.modeldata.email + "&phone=" + this.modeldata.phone;
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.http.post('/oa/basic/web/index.php?r=index/setuserinfo',creds,{headers:myHeaders})
    .map((res)=>res.json()).subscribe(data=>{
if(data == 1){
  alert('修改成功！');
// $("#qxan").click();
}else{
  alert("修改失败！")
}
    })
  }
// 修改密码模态框操纵方法
xgmm(){
  if(this.xmm != this.qrxmm){
                alert('新密码两次输入不一致,请重新输入！');
                this.ymm = '';
                this.xmm = '';
                this.qrxmm = '';
                return;
            }
  if(this.ymm == this.xmm){
    alert('新密码不能与原密码相同,请重新设置！');
    this.ymm = '';
    this.xmm = '';
    this.qrxmm = '';
                return;
  }
  var creds = 'ymm=' + this.ymm + "&xmm=" + this.xmm + "&qrxmm=" + this.qrxmm;
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.http.post('/oa/basic/web/index.php?r=index/xgmm',creds,{headers:myHeaders})
    .map((res)=>res.json()).subscribe(data=>{
                        if(data==2){
                            alert('原密码输入错误！');
                        }
                        if(data == 1){
                            alert('修改密码成功！');
                        }
                        this.xmm="";this.ymm="";this.qrxmm="";
    })
}
lefthide(){
  this.ifleft = !this.ifleft;
}
}

