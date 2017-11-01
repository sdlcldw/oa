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
import { GrzlGuard } from 'app/module-grbg/guard/grzl.guard';

const Routes=[
  {path:'gzcx',component:GzcxComponent,},
  {path:'txl',component:TxlComponent,},
  {path:'wdzs',component:WdzsComponent,},
  {path:'gjcjtxl',component:GjcjtxlComponent,},
  {path:'brsy',component:BrsyComponent,},
  {path:'grzl',component:GrzlComponent,canDeactivate:[GrzlGuard]},
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
  declarations: [GzcxComponent, TxlComponent, GjcjtxlComponent, WdzsComponent, BrsyComponent, GrzlComponent],
  providers: [GrzlGuard],
})
export class GrbgModule { }
