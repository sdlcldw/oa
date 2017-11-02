import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import { Http,Headers } from "@angular/http";

@Component({
  selector: 'app-kqbsc',
  templateUrl: './kqbsc.component.html',
  styleUrls: ['./kqbsc.component.css']
})
export class KqbscComponent implements OnInit {

  kqbdata:any = [];
  // tggzdata:Array<any> = [];
  
  ifkqb:boolean = true;
  yangli:boolean = false;
  

  constructor(private http:Http,) { }

  ngOnInit() {

  }

// B: 初始化定义uploader变量,用来配置input中的uploader属性
public uploader:FileUploader = new FileUploader({
  url: "/oa/basic/web/index.php?r=zhxz/kqbsc_uploadfile",
  method: "POST",
  itemAlias: "kqb",
  removeAfterUpload:true,
});
// C: 定义事件，选择文件
selectedFileOnChanged(event:any) {
  console.log(event.target.value);
}
// D: 定义事件，上传文件
kqbyl() {
  // 上传
  // this.uploader.queue[0].onSuccess = function (response, status, headers) {
    this.uploader.queue[0].onSuccess = (response, status, headers) => {    
      // 上传文件成功
      if (status == 200) {
          // 上传文件后获取服务器返回的数据
          // let tempRes = JSON.parse(response);
          if(response == '1'){
            alert("考勤表格式错误，请按照样例修改后再试！");
            return; 
          }
        if(response=='2'){
          alert("本月考勤表已存在，请勿重复上传！错误号：2");
           return; 
        }
        this.yangli = true;
        this.ifkqb = false; 
        this.kqbdata = JSON.parse(response);

      } else {
          // 上传文件后获取服务器返回的数据错误
          alert("上传失败了");
      }
  };
  this.uploader.queue[0].upload(); // 开始上传
}

kqbsc(){
  this.http.get('/oa/basic/web/index.php?r=zhxz/kqbsc_sc').subscribe((res=> {
    console.log(res.json());
    var data = res.json();
    if(data){
      alert('成功上传：'+ data + '条考勤记录！');
      this.ifkqb = true;
      this.yangli = false;
    }
}
));
}


}