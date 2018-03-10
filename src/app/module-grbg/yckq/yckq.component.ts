import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../service/TskService';

@Component({
  selector: 'app-yckq',
  templateUrl: './yckq.component.html',
  styleUrls: ['./yckq.component.css']
})
export class YckqComponent implements OnInit {
  sf;
  czfw;
  xsdata;
  columns = [
    { key: 'kc_name', title: '课程' },
    { key: 'njb_name', title: '年级部' },
    { key: 'bj_name', title: '班级' },
    { key: 'xs_name', title: '姓名' },
    { key: 'xb', title: '性别' },
    { key: 'kqzt', title: '考勤情况' },
    { key: 'bz', title: 'bz' },
  ];
  configuration = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    globalSearchEnabled: true,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: true,
    selectCol: false,
    selectCell: false,
    rows: 50,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false
  };

  
  constructor(private http: HttpClient, private tsk: TskService,) {
    

  }
  ngOnInit() {
    this.getyckq();
  }
  getyckq() {
    this.http.get('/oa/basic/web/index.php?r=grbg/yckq_get').subscribe(data => {
      if (data) {
        console.log(data);
        if(data == 2){
          this.tsk.tsk('没有符合条件的记录！',5000)
        }else{
        this.xsdata= data;
      }}
    });
  }
  qkform(){
 
  }
  xzjl(d) {
    
  }
 
  onSubmit_wj() {
  }
  onSubmit_ry() {
  }
}