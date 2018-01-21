import { Component, OnInit, TemplateRef,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TskService } from '../../service/TskService';


@Component({
  selector: 'app-xkjg',
  templateUrl: './xkjg.component.html',
  styleUrls: ['./xkjg.component.css']
})
export class XkjgComponent implements OnInit {

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
  datat;
  columnst = [
    { key: 'kc_id', title: '课程Id' },
    { key: 'name', title: '学生姓名' },
    { key: 'xb', title: '学生性别' },
    { key: 'njb', title: '所在年级部' },
    { key: 'bj', title: '所在班级' },
    { key: 'zt', title: '课程状态' },
  ];
  configurationt = {
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

  timer;
xsmd_kcdata={};
  constructor(private http: HttpClient, private modalService: BsModalService, private tsk: TskService, ) {

  }

  ngOnInit() {
    this.getlist();
    this.timer = setInterval(()=>{this.getlist();console.log('选课结果组件获取数据');},60000);
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
  xsmd(_id, name,template: TemplateRef<any>) {
    this.http.post("/oa/basic/web/index.php?r=xsgl/xkjg_xsmd_get", { id: _id }).toPromise().then((response) => {
      console.log(response);
      if (response) {
        this.datat = response;
        this.xsmd_kcdata['name'] = name;
        this.xsmd_kcdata['id'] = _id;
        this.modalRef = this.modalService.show(template, Object.assign({}, this.modal_config, { class: 'modal-xsmd' }));
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
  excel_dcall(){
    window.open('/oa/basic/web/index.php?r=xsgl/xkjg_dcall');
  }
  excel_dcone(){
    window.open('/oa/basic/web/index.php?r=xsgl/xkjg_dcone&d='+this.xsmd_kcdata['id']);
  }

}
