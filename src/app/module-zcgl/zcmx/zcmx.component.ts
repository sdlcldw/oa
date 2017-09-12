import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zcmx',
  templateUrl: './zcmx.component.html',
  styleUrls: ['./zcmx.component.css']
})
export class ZcmxComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      usename: {
        title: 'User Name'
      },
      emai: {
        title: 'Email'
      }
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

}
