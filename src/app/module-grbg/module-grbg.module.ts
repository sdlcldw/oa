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
import { KtjlComponent } from './ktjl/ktjl.component';
import { JkpjComponent } from './jkpj/jkpj.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RatingModule } from 'ngx-bootstrap';
import { XjpjPipe } from './pipe/xjpj.pipe';
import { KtjlCkComponent } from './ktjl-ck/ktjl-ck.component';

import {TableModule} from 'ngx-easy-table';
import { KqztPipe } from './pipe/kqzt.pipe';
import { ZtPipe } from './pipe/zt.pipe';
import { XskqComponent } from './xskq/xskq.component';
import { YckqComponent } from './yckq/yckq.component';


const Routes=[
  {path:'gzcx',component:GzcxComponent,},
  {path:'txl',component:TxlComponent,},
  {path:'wdzs',component:WdzsComponent,},
  {path:'gjcjtxl',component:GjcjtxlComponent,},
  {path:'brsy',component:BrsyComponent,},
  {path:'grzl',component:GrzlComponent,canDeactivate:[GrzlGuard]},
  {path:'kqjl',component:KqjlComponent},
  {path:'bmkqjl',component:BmkqjlComponent,canActivate:[QxGuard]},
  {path:'ktjl',component:KtjlComponent},
  {path:'ktjl_ck',component:KtjlCkComponent},
  {path:'jkpj',component:JkpjComponent},
  {path:'yckq',component:YckqComponent},
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(Routes),
    Ng2SmartTableModule,
    FormsModule, 
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RatingModule.forRoot(),
    TableModule, 
  ],
  declarations: [GzcxComponent, TxlComponent, GjcjtxlComponent, WdzsComponent, BrsyComponent, GrzlComponent, KqjlComponent, BmkqjlComponent,KtjlComponent,JkpjComponent, XjpjPipe, KtjlCkComponent, KqztPipe,ZtPipe, XskqComponent, YckqComponent],
  providers: [GrzlGuard,QxGuard],
})
export class GrbgModule{ }
