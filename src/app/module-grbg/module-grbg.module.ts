import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { GzcxComponent } from './gzcx/gzcx.component';
import { TxlComponent } from './txl/txl.component';

import { GjcjtxlComponent } from './gjcjtxl/gjcjtxl.component';
import { WdzsComponent } from './wdzs/wdzs.component';
import { BrsyComponent } from './brsy/brsy.component';
import { GrzlComponent } from './grzl/grzl.component';

const Routes=[
  {path:'gzcx',component:GzcxComponent,},
  {path:'txl',component:TxlComponent,},
  {path:'wdzs',component:WdzsComponent,},
  {path:'gjcjtxl',component:GjcjtxlComponent,},
  {path:'brsy',component:BrsyComponent,},
  {path:'grzl',component:GrzlComponent,},
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(Routes),
    Ng2SmartTableModule
  ],
  declarations: [GzcxComponent, TxlComponent, GjcjtxlComponent, WdzsComponent, BrsyComponent, GrzlComponent]
})
export class GrbgModule { }
