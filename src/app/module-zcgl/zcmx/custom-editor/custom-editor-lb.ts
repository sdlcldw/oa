import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { Http,RequestOptions } from "@angular/http";
@Component({
  template: `
  <select #sylb [(ngModel)]="newlb" style="padding: 6px 0px;" class="form-control short-input" (ngModelChange)="updateValue()">
  <option *ngFor="let lb of lbs" [value]='lb' >{{lb}}</option>
</select>
  `,
})
export class LbEditor extends DefaultEditor implements AfterViewInit {
  @ViewChild('lb') lb: ElementRef;
lbs = [];
newlb = '';
  constructor(private http:Http) {
    super();
    this.http.get('/oa/basic/web/index.php?r=zcgl/get_lb').map(res => res.json()).subscribe(data => {
          console.log(data)
          if(data){
      this.lbs = data;
      }});
  }
  ngAfterViewInit() {
  }
  updateValue(){
    this.cell.newValue = this.newlb;
    console.log(this.newlb)
  }
}
