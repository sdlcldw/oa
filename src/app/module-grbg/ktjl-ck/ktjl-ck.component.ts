import { Component, OnInit,TemplateRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../service/TskService';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-ktjl-ck',
  templateUrl: './ktjl-ck.component.html',
  styleUrls: ['./ktjl-ck.component.css']
})
export class KtjlCkComponent implements OnInit {
  data;
  columns = [
    { key: 'name', title: '课程名'},
    { key: 'sj', title: '时间'},
    { key: 'kq_yd', title: '应到'},
    { key: 'kq_sd', title: '实到'},
    { key: 'kq_qj', title: '请假'},
    { key: 'kq_cd', title: '迟到'},
    { key: 'kq_kc', title: '旷课'},
    { key: 'kq_xjpj', title: '星级评价'},
    { key: 'username', title: '记录教师'},
    { key: '', title: '操作'}
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
    rows: 30,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false
  };

  modalCkjl: BsModalRef;
  modal_ckjl_config = {
    animated: false,
    keyboard: true,
    backdrop: false,
    ignoreBackdropClick: false
  };

  ckjldata;

  constructor(private http: HttpClient, private tsk: TskService,private modalService: BsModalService,) {

  }

  ngOnInit() {
    this.getktjl();
  }

  getktjl(){
    this.http.get('/oa/basic/web/index.php?r=grbg/ktjl_ck_get').subscribe(data => {
      if (data) {
        if(data == 2){
          this.tsk.tsk('没有查询到你提交过的课堂记录！',5000)
        }else{
        this.data= data;
      }}
    });
  }

  ckjl(template: TemplateRef<any>,id){

    this.http.post("/oa/basic/web/index.php?r=grbg/ktjl_ck_getkc",{id:id}).toPromise().then((response) => {
        console.log(response);
        this.ckjldata = response;
        this.modalCkjl = this.modalService.show(template,Object.assign({}, this.modal_ckjl_config, { class: 'modal-ckjl' }));
    });
    console.log(id);
  }
  del(id){
    if(window.confirm('本操作将删除该条课堂记录和与之关联的学生考勤记录，确定要删除吗？')){
      this.http.post("/oa/basic/web/index.php?r=grbg/ktjl_del",{id:id}).toPromise().then((response) => {
      console.log(response);
     if(response){
      this.tsk.cg('删除成功！');
      this.getktjl();
     }
  });
  
}
   
  }
}
