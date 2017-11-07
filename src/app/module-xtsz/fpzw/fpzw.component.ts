import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import { TskService } from 'app/service/TskService';

@Component({
  selector: 'app-fpzw',
  templateUrl: './fpzw.component.html',
  styleUrls: ['./fpzw.component.css']
})
export class FpzwComponent implements OnInit {

  settings = {
    attr:{
      class:'table table-bordered table-hover table-condensed text-center',
    },
    actions:{
      columnTitle:'操作',
      edit:false,
      add:false,
    },
    delete: {
      deleteButtonContent: '<i title="分配职务" class="icon ion-key"></i>',
      confirmDelete: true
    },
    columns: {
      Id: {title: '用户ID'},
      username: {title: '用户名'},
      item_name:{title:'职务'},
    },
    pager:{
      perPage:'30',
    },
  };
    
  source: LocalDataSource = new LocalDataSource();

  data;
  myForm: FormGroup;

    iffpzw:boolean = false;
    zwall: string[];
    ifzw:boolean[];
    
    selects: string[] = [];

  constructor(private fb: FormBuilder,private http:Http,private tsk:TskService) {
   
  }

  ngOnInit() {
   this.datainit();
  }
  datainit(){
     this.http.get('/oa/basic/web/index.php?r=xtsz/fpzw_get_users').map(res => res.json()).subscribe(data => {
       if(data){
        this.source.load(data);
       }
    });
  }
  onDeleteConfirm($event){
    let dat = {id:$event.data.Id};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/fpzw_get_assignment",dat, { headers: myHeaders }).toPromise().then((response) => {
      let datas :any[]= response.json();
       datas['user']=$event.data;
       console.log(datas);

       this.data= datas;
       this.ifzw = this.data['ifzw'];
       this.zwall = this.data['zwall'];
       this.iffpzw = true;
   
       this.myForm = this.fb.group({
         zw: this.fb.array(this.ifzw),
       });
  });
  }
  ok(){
    this.selects = [];
    this.zw.value.forEach((selected: boolean ,i: number) => {
      selected === true && this.selects.push(this.zwall[i]['name'])
    });
    console.log(this.selects);
    let dat = {id:this.data.user.Id,zws:this.selects};
    let myHeaders:Headers = new Headers();
    myHeaders.append("Content-Type","application/json; charset=UTF-8");
    this.http.post("/oa/basic/web/index.php?r=xtsz/fpzw_add_assignment",dat, { headers: myHeaders }).toPromise().then((response) => {
      // let data= response.json();
      if(response){
      this.tsk.cg('分配成功！');
      this.fh();
   this.datainit();   
    }
  });
  }
  fh(){
    this.iffpzw = false;
    this.data= '';
    this.ifzw = [];
    this.zwall = [];
  }
  get zw () {
    return this.myForm.get('zw');
  }

}

