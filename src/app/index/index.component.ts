import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import * as $ from 'jquery';
import jQuery from 'jquery';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {FileUploader} from "ng2-file-upload";
import { Location } from '@angular/common';
import { TskService } from "app/service/TskService";
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
  height: number;
  menu_ul_height:number;
  username: string;
  userimage: string;
  userId:number;

  menu_title = "个人办公";

model: any;
modelt:any;

ifsczp:boolean = true;

modeldata;

ymm;
xmm;
qrxmm;

xgzl:boolean=false;

ifleft:boolean=false;

  constructor(private router: Router, private http: Http, private modalService:NgbModal, private location: Location,private tsk:TskService,private ar:ActivatedRoute) {
    this.zxrs = this.http.get('/oa/basic/web/index.php?r=index/up_time').map((res) => res.json());

    this.height = $(window).height() - 100;
    this.menu_ul_height = $(window).height() - 100 - 232;
  }
  ngOnInit() {
    this.ar.data.subscribe((data=>{
      this.username = data.info.username;
      this.userId =data.info.userid;
      this.userimage = "assets/images/jsimg/" + this.userId + ".jpg?" + Math.random();
    })

    )
    

    this.grbg = true;

    this.zxrsdata();
    setInterval(() => { this.zxrsdata() }, 2000 * 60);

        this.http.get('/oa/basic/web/index.php?r=index/getuserinfo').subscribe((data) => {
      this.modeldata = data.json();
      console.log(this.modeldata);
      this.xgzl = true;
      
  })
}
    // 回退
    goBack(): void {
      this.location.back();
    }


 // B: 初始化定义uploader变量,用来配置input中的uploader属性
    public uploader:FileUploader = new FileUploader({
        url: "/oa/basic/web/index.php?r=jssczp/uploadfile",
        method: "POST",
        itemAlias: "uploadedfile",
        removeAfterUpload:true,
    });
    // C: 定义事件，选择文件
    selectedFileOnChanged(event:any) {
      console.log(this.userId);
      
        // 打印文件选择名称
        console.log(event.target.value);
    }
    // D: 定义事件，上传文件
    uploadFile() {
        // 上传
        // this.uploader.queue[0].onSuccess = function (response, status, headers) {
          this.uploader.queue[0].onSuccess = (response, status, headers) => {    
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                // let tempRes = JSON.parse(response);
                if(response == '1'){
                  this.ifsczp = true;
                  this.userimage = "assets/images/jsimg/" + this.userId + ".jpg?" + Math.random();
                  alert('上传成功！');
                  
                }else{
                alert(response);
              }
            } else {
                // 上传文件后获取服务器返回的数据错误
                alert("上传失败了");
            }
        };
        this.uploader.queue[0].upload(); // 开始上传
    }


  zxrsdata() {
    this.zxrs.subscribe((data) => {
      this.rs = data;
      console.log(data);
    })
  }

  changeleft(name) {
    if(name != 'grbg' && $.cookie("qx").indexOf(name) == -1 ){
      this.tsk.tsk('对不起，您的权限不足！');
      return;
  }
    this.xsgl = false;
    this.zcgl = false;
    this.grbg = false;
    this.rsgl = false;
    this.cwpt = false;
    this.xtsz = false;
    
  
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
    }
  }
  Logout() {
    this.http.get('/oa/basic/web/index.php?r=index/logout').subscribe((data) => {
      if (data.json() == 1) {
        console.log('退出成功');
        this.router.navigate(['login'])
      }
    })
  }

// 个人资料模态框操作方法

open(){
  $("#username").click();
}


zpsc(){
  this.ifsczp = false;
}
qxsczp(){
   this.ifsczp = true;
}

  submit() {
    console.log("submit按钮按下了");
    console.log(this.modeldata);
    var creds = 'sex=' + this.modeldata.sex + "&email=" + this.modeldata.email + "&phone=" + this.modeldata.phone;
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    this.http.post('/oa/basic/web/index.php?r=index/setuserinfo',creds,{headers:myHeaders})
    .map((res)=>res.json()).subscribe(data=>{
if(data == 1){
  alert('修改成功！');
$("#qxan").click();
}else{
  alert("修改失败！")
}
    })
  }

open_password(content){
  console.log('修改密码模态框该出现了');
 $("#qxan").click();
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
                             $("#qxant").click();
                        }
                        this.xmm="";this.ymm="";this.qrxmm="";
    })
}
lefthide(){
  this.ifleft = !this.ifleft;
}
}

