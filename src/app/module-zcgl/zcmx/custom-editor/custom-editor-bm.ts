import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { Http,RequestOptions } from "@angular/http";
@Component({
  template: `
  <select #sybm [(ngModel)]="newbm" style="padding: 6px 0px;" class="form-control short-input" (ngModelChange)="updateValue()">
  <option *ngFor="let bm of bms" [value]='bm' >{{bm}}</option>
</select>
  `,
})
export class BmEditor extends DefaultEditor implements AfterViewInit {
  @ViewChild('sybm') sybm: ElementRef;
bms = [];
newbm = '';
  constructor(private http:Http) {
    super();
    this.http.get('/oa/basic/web/index.php?r=zcgl/bmjbxx_get_bm').map(res => res.json()).subscribe(data => {
          console.log(data)
          if(data){
      this.bms = data;
      }});
  }
  ngAfterViewInit() {
  }
  updateValue(){
    this.cell.newValue = this.newbm;
    console.log(this.newbm)
  }
}
