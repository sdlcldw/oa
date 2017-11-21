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
import { BzrpzComponent } from './bzrpz/bzrpz.component';
import { RkjspzComponent } from './rkjspz/rkjspz.component';
import { XsjbxxComponent } from './xsjbxx/xsjbxx.component';

const Routes=[
  {path:'cjxs',component:CjxsComponent},
  {path:'xxsh',component:XxshComponent},
  {path:'zszl',component:ZszlComponent},
  {path:'njbsz',component:NjbszComponent},
  {path:'bjsz',component:BjszComponent},
  {path:'sssz',component:SsszComponent},
  {path:'bzrpz',component:BzrpzComponent},
  {path:'rkjspz',component:RkjspzComponent},
  {path:'xsjbxx',component:XsjbxxComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CjxsComponent, XxshComponent, ZszlComponent, NjbszComponent, BjszComponent, SsszComponent, BzrpzComponent, RkjspzComponent, XsjbxxComponent]
})

export class XsglModule { }
