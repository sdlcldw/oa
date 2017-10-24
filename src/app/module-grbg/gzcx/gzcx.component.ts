import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { TskService } from 'app/service/TskService';



@Component({
  selector: 'app-gzcx',
  templateUrl: './gzcx.component.html',
  styleUrls: ['./gzcx.component.css']
})
export class GzcxComponent implements OnInit,AfterViewInit {

htgzSource:Observable<any>;
tggzSource:Observable<any>;

htgzdata:Array<any> = [];
tggzdata;

ifhtgz:boolean;
iftggz:boolean;

    constructor(private http:Http,private tsk:TskService) {
     this.htgzSource = this.http.get('/oa/basic/web/index.php?r=grbg/gzcx_htgz').map((res)=>res.json());
     this.tggzSource = this.http.get('/oa/basic/web/index.php?r=grbg/gzcx_tggz').map((res)=>res.json());
  }

   ngOnInit() {
    this.htgz();
  }

  htgz(){
this.htgzSource.subscribe((data) =>{
      if(data==2){
        this.tsk.tsk('您目前没有合同工资数据，请点击套改工资试试吧')
  return;
}
this.ifhtgz=true;
this.iftggz=false;
this.htgzdata = data
})
  }
  tggz(){
this.tggzSource.subscribe(data  =>{
if(data==2){
  this.tsk.tsk('您目前没有套改工资数据，请点击合同工资试试吧')
  return;
}
    this.ifhtgz=false;
    this.iftggz=true;
this.tggzdata = data
})
  }

  ngAfterViewInit(): void {
    console.log('初始完毕啦！');
  }

}


