import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import { Http,Headers } from "@angular/http";

@Component({
  selector: 'app-gzbsc',
  templateUrl: './gzbsc.component.html',
  styleUrls: ['./gzbsc.component.css']
})
export class GzbscComponent implements OnInit {

  htgzdata:any = [];
  tggzdata:Array<any> = [];
  
  ifgzb:boolean = true;
  yangli:boolean = false;
  

  constructor(private http:Http,) { }

  ngOnInit() {

  }

// B: 初始化定义uploader变量,用来配置input中的uploader属性
public uploader:FileUploader = new FileUploader({
  url: "/oa/basic/web/index.php?r=cwpt/gzbsc_uploadfile",
  method: "POST",
  itemAlias: "gzb",
  removeAfterUpload:true,
});
// C: 定义事件，选择文件
selectedFileOnChanged(event:any) {
  console.log(event.target.value);
}
// D: 定义事件，上传文件
gzbyl() {
  // 上传
  // this.uploader.queue[0].onSuccess = function (response, status, headers) {
    this.uploader.queue[0].onSuccess = (response, status, headers) => {    
      // 上传文件成功
      if (status == 200) {
          // 上传文件后获取服务器返回的数据
          // let tempRes = JSON.parse(response);
          if(response == '1'){
            alert("合同工资表格式错误，请按照样例修改后再试！");
            return; 
          }
        if(response=='2'){
          alert("套改工资表格式错误，请按照样例修改后再试！");
           return; 
        }
        if(response=='3'){
          alert("本月份工资表已存在，请勿重复上传！错误号：3");
           return; 
        }
        if(response=='4'){
          alert("本月份工资表已存在，请勿重复上传！错误号：4");
           return; 
        }
        this.yangli = true;
        this.ifgzb = false; 
        this.htgzdata = JSON.parse(response).htgz;
        this.tggzdata = JSON.parse(response).tggz;
      } else {
          // 上传文件后获取服务器返回的数据错误
          alert("上传失败了");
      }
  };
  this.uploader.queue[0].upload(); // 开始上传
}

gzbsc(){
  this.http.get('/oa/basic/web/index.php?r=cwpt/gzbsc_gzbsc').subscribe((res=> {
    console.log(res.json());
    var data = res.json();
    if(data){
      alert('成功上传：'+ data.htgz + '条合同工资,' +  data.tggz + '条套改工资!');
      this.ifgzb = true;
      this.yangli = false;
    }
}
));
}


}
