import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zcmx',
  templateUrl: './zcmx.component.html',
  styleUrls: ['./zcmx.component.css']
})
export class ZcmxComponent implements OnInit {

  settings = {
    actions:{
      position:'right',
      columnTitle:'操作'
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {title: 'ID'},
      name: {title: '资产编号'},
      usename: {title: '资产名称'},
      emai: {title: '规格型号'}
    }
  };
  data = [
    {
      id: 1,
      name: "Leanne Graham",
      usename: "Bret",
      emai: "Sincere@april.biz"
    },
    {
      id: 2,
      name: "Ervin Howell",
      usename: "Antonette",
      emai: "Shanna@melissa.tv"
    },
    
    // ... list of items
    
    {
      id: 11,
      name: "Nicholas DuBuque",
      usename: "Nicholas.Stanton",
      emai: "Rey.Padberg@rosamond.biz"
    }
  ];

  constructor() { }

  ngOnInit() {
  }
  row(event){
    console.log('123')
    
  }
  ondelete(){
    console.log('789')
  }
  oncreste(event){
    console.log(event.source);
    console.log('456')
  }

  onDeleteConfirm(event){
    console.log(event.source.data);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
