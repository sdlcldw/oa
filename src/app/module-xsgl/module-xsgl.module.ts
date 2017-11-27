import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CjxsComponent } from './cjxs/cjxs.component';
import { XxshComponent } from './xxsh/xxsh.component';
import { ZszlComponent } from './zszl/zszl.component';
import { NjbszComponent } from './njbsz/njbsz.component';
import { BjszComponent } from './bjsz/bjsz.component';
import { SsszComponent } from './sssz/sssz.component';
import { XsjbxxComponent } from './xsjbxx/xsjbxx.component';
import { SsszLcComponent } from './sssz-lc/sssz-lc.component';
import { SsszFjComponent } from './sssz-fj/sssz-fj.component';
import { SsszCwComponent } from './sssz-cw/sssz-cw.component';

const Routes=[
  {path:'cjxs',component:CjxsComponent},
  {path:'xxsh',component:XxshComponent},
  {path:'zszl',component:ZszlComponent},
  {path:'njbsz',component:NjbszComponent},
  {path:'bjsz',component:BjszComponent},
  {path:'sssz',component:SsszComponent},
  {path:'sssz_lc',component:SsszLcComponent},
  {path:'sssz_fj',component:SsszFjComponent},
  {path:'sssz_cw',component:SsszCwComponent},
  {path:'xsjbxx',component:XsjbxxComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CjxsComponent, XxshComponent, ZszlComponent, NjbszComponent, BjszComponent, SsszComponent, XsjbxxComponent, SsszLcComponent, SsszFjComponent, SsszCwComponent]
})

export class XsglModule { }
