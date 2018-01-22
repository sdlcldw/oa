import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GzcxComponent } from './gzcx/gzcx.component';
import { TxlComponent } from './txl/txl.component';

import { GjcjtxlComponent } from './gjcjtxl/gjcjtxl.component';
import { WdzsComponent } from './wdzs/wdzs.component';
import { BrsyComponent } from './brsy/brsy.component';
import { GrzlComponent } from './grzl/grzl.component';

import { KqjlComponent } from './kqjl/kqjl.component';
import { BmkqjlComponent } from './bmkqjl/bmkqjl.component';
import { GrzlGuard } from './guard/grzl.guard';
import { QxGuard } from '../guard/qx.guard';


const Routes=[
  {path:'gzcx',component:GzcxComponent,},
  {path:'txl',component:TxlComponent,},
  {path:'wdzs',component:WdzsComponent,},
  {path:'gjcjtxl',component:GjcjtxlComponent,},
  {path:'brsy',component:BrsyComponent,},
  {path:'grzl',component:GrzlComponent,canDeactivate:[GrzlGuard]},
  {path:'kqjl',component:KqjlComponent},
  {path:'bmkqjl',component:BmkqjlComponent,canActivate:[QxGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(Routes),
    Ng2SmartTableModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [GzcxComponent, TxlComponent, GjcjtxlComponent, WdzsComponent, BrsyComponent, GrzlComponent, KqjlComponent, BmkqjlComponent],
  providers: [GrzlGuard,QxGuard],
})
export class GrbgModule { }
