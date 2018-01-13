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
import { FileUploadModule } from 'ng2-file-upload';
import {TableModule} from 'ngx-easy-table';
import { ZjjlComponent } from './zjjl/zjjl.component';
import { CkjlComponent } from './ckjl/ckjl.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
  {path:'zjjl',component:ZjjlComponent},
  {path:'ckjl',component:CkjlComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,   
    TableModule, 
    BsDatepickerModule.forRoot(),
    
  ],
  declarations: [
    CjxsComponent,
    XxshComponent, 
    ZszlComponent,
    NjbszComponent, 
    BjszComponent, 
    SsszComponent, 
    XsjbxxComponent, 
    SsszLcComponent,
    SsszFjComponent,
    SsszCwComponent,
    ZjjlComponent,
    CkjlComponent,
  ],
})

export class XsglModule { }
