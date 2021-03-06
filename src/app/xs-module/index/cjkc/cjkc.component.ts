import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TskService } from '../../../service/TskService';

@Component({
  selector: 'app-cjkc',
  templateUrl: './cjkc.component.html',
  styleUrls: ['./cjkc.component.css']
})
export class CjkcComponent implements OnInit {  
  data;
  columns = [
    { key: 'Id', title: 'id' },
    { key: 'name', title: '课程名称' },
    { key: 'userneme', title: '讲师' },
    { key: 'rs', title: '人数上限' },
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
  constructor(private http: HttpClient, private modalService: BsModalService, private tsk: TskService, ) {

  }

  ngOnInit() {
    this.getlist();
  }
  getlist() {
    this.http.get('/oa/basic/web/index.php?r=xsindex/cjkc_get').subscribe(data => {
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
}
