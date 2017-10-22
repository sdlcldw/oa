import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { Http,RequestOptions } from "@angular/http";
@Component({
  template: `
  <select #syly [(ngModel)]="newly" style="padding: 6px 0px;" class="form-control short-input" (ngModelChange)="updateValue()">
  <option *ngFor="let ly of lys" [value]='ly' >{{ly}}</option>
</select>
  `,
})
export class LyEditor extends DefaultEditor implements AfterViewInit {
  @ViewChild('ly') ly: ElementRef;
lys = [];
newly = '';
  constructor(private http:Http) {
    super();
    this.http.get('/oa/basic/web/index.php?r=zcgl/zcly_get').map(res => res.json()).subscribe(data => {
          console.log(data)
          if(data){
      this.lys = data;
      }});
  }
  ngAfterViewInit() {
  }
  updateValue(){
    this.cell.newValue = this.newly;
    console.log(this.newly)
  }
}
