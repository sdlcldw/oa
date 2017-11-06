import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BmjbxxComponent } from './bmjbxx/bmjbxx.component';
import { YhlbComponent } from './yhlb/yhlb.component';
import { DljlComponent } from './dljl/dljl.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CjjsComponent } from './cjjs/cjjs.component';
import { JslbComponent } from './jslb/jslb.component';
import { FpqxComponent } from './fpqx/fpqx.component';
import { DataService } from './DataService';
import { YhsqComponent } from './yhsq/yhsq.component';
import { YhsqFpjsComponent } from './yhsq_fpjs/yhsq_fpjs.component';
import { FpjsGuard } from './fpjs.guard';
import { FpqxGuard } from './fpqx.guard';
import { QxGuard } from 'app/guard/qx.guard';
import { BmwhComponent } from './bmwh/bmwh.component';
import { ZwwhComponent } from './zwwh/zwwh.component';
import { FpzwComponent } from './fpzw/fpzw.component';

const Routes=[
  {path:'bmjbxx',component:BmjbxxComponent,canActivate:[QxGuard]},
  {path:'yhlb',component:YhlbComponent,canActivate:[QxGuard]},
  {path:'dljl',component:DljlComponent,canActivate:[QxGuard]},
  {path:'cjjs',component:CjjsComponent,canActivate:[QxGuard]},
  {path:'jslb',component:JslbComponent,canActivate:[QxGuard]},
  {path:'fpqx',component:FpqxComponent,canActivate:[QxGuard,FpqxGuard]},
  {path:'yhsq',component:YhsqComponent,canActivate:[QxGuard]},
  {path:'yhsq-fpjs',component:YhsqFpjsComponent,canActivate:[QxGuard,FpjsGuard]},
  {path:'bmwh',component:BmwhComponent,canActivate:[QxGuard]},
  {path:'zwwh',component:ZwwhComponent,canActivate:[QxGuard]},
  {path:'fpzw',component:FpzwComponent,canActivate:[QxGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule, 
    Ng2SmartTableModule,
  ], 
  providers: [DataService,FpjsGuard,FpqxGuard,QxGuard],  
  declarations: [BmjbxxComponent, YhlbComponent, DljlComponent, CjjsComponent, JslbComponent, FpqxComponent, YhsqComponent, YhsqFpjsComponent, BmwhComponent, ZwwhComponent, FpzwComponent]
})
export class XtszModule { }
