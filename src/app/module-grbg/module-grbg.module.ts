import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { GzcxComponent } from './gzcx/gzcx.component';
import { TxlComponent } from './txl/txl.component';

import { GjcjtxlComponent } from './gjcjtxl/gjcjtxl.component';
import { WdzsComponent } from './wdzs/wdzs.component';

const Routes=[
  {path:'gzcx',component:GzcxComponent,},
{path:'txl',component:TxlComponent,},
{path:'wdzs',component:WdzsComponent,},
{path:'gjcjtxl',component:GjcjtxlComponent,},
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(Routes),
  ],
  declarations: [GzcxComponent, TxlComponent, GjcjtxlComponent, WdzsComponent]
})
export class GrbgModule { }
