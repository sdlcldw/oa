import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { Http,RequestOptions } from "@angular/http";
@Component({
  template: `
  <select #zt [(ngModel)]="newzt"  class="form-control short-input" (ngModelChange)="updateValue()">
  <option *ngFor="let zt of zts" [value]='zt' >{{zt}}</option>
</select>
  `,
})
export class ZtEditor extends DefaultEditor implements AfterViewInit {
  @ViewChild('zt') zt: ElementRef;
zts = [];
newzt = '';
  constructor(private http:Http) {
    super();
    this.http.get('/oa/basic/web/index.php?r=zcgl/get_zt').map(res => res.json()).subscribe(data => {
          console.log(data)
          if(data){
      this.zts = data;
      }});
  }
  ngAfterViewInit() {
  }
  updateValue(){
    this.cell.newValue = this.newzt;
    console.log(this.newzt)
  }
}
