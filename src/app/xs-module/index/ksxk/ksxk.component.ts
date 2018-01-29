import { Component, OnInit, TemplateRef,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TskService } from '../../../service/TskService';

@Component({
  selector: 'app-ksxk',
  templateUrl: './ksxk.component.html',
  styleUrls: ['./ksxk.component.css']
})
export class KsxkComponent implements OnInit {
  data;
  columns = [
    { key: 'Id', title: 'id' },
    { key: 'name', title: '课程名称' },
    { key: 'userneme', title: '讲师' },
    { key: 'rs', title: '人数上限' },
    { key: 'ybrs', title: '已报人数' },
    { key: 'kssj', title: '课程开始' },
    { key: 'jssj', title: '课程结束' },
    { key: 'zt', title: '课程状态' },
    { key: '操作', title: '操作' },
  ];
  configuration = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: false,
    globalSearchEnabled: false,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: true,
    selectCol: false,
    selectCell: false,
    rows: 30,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false
  };

  modalRef: BsModalRef;
  modal_config = {
    animated: false,
    keyboard: true,
    backdrop: false,
    ignoreBackdropClick: false
  };

  jsimage;
  kcdata = {};
  timer;

  constructor(private http: HttpClient, private modalService: BsModalService, private tsk: TskService, ) {

  }

  ngOnInit() {
    this.getlist();
    this.timer = setInterval(()=>{this.getlist();console.log('开始选课组件获取数据');},6000);
  }
  ngOnDestroy(){
    if(this.timer){
    clearInterval(this.timer);
    }
  }
sxsj(){
  this.getlist();  
}
  getlist() {
    this.http.get('/oa/basic/web/index.php?r=xsindex/ksxk_get').subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }
  xx(_id, template: TemplateRef<any>) {
    this.http.post("/oa/basic/web/index.php?r=xsindex/ksxk_ck", { id: _id }).toPromise().then((response) => {
      console.log(response);
      if (response) {
        this.kcdata = response;
        this.jsimage = "assets/images/jsimg/" + response['user_id'] + ".jpg?" + Math.random();
        this.modalRef = this.modalService.show(template, Object.assign({}, this.modal_config, { class: 'modal-kcxq' }));
      } else {
        this.tsk.tsk('获取信息失败！');
      }
    });
  }
  xzkc(_id) {
    console.log(_id);
    this.http.post("/oa/basic/web/index.php?r=xsindex/ksxk_xk", { id: _id }).toPromise().then((response) => {
      if (response) {
        if (response == 2) {
          this.tsk.tsk('你已选课，只能同时选一门课哦！');
          return;
        } else if (response == 3) {
          this.tsk.tsk('该课程已报满，快去看看其他喜欢的课吧！');
          return;
        } else {
          this.tsk.cg('选课成功！');
          this.modalRef.hide();
        }
      } else {
        this.tsk.tsk('操作失败！');
      }
    });
  }

}
