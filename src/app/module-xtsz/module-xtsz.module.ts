import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BmjbxxComponent } from './bmjbxx/bmjbxx.component';
import { YhlbComponent } from './yhlb/yhlb.component';
import { DljlComponent } from './dljl/dljl.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { JsglComponent } from './jsgl/jsgl.component';
import { JslbComponent } from './jslb/jslb.component';
import { FpqxComponent } from './fpqx/fpqx.component';
import { DataService } from './DataService';

const Routes=[
  {path:'bmjbxx',component:BmjbxxComponent},
  {path:'yhlb',component:YhlbComponent},
  {path:'dljl',component:DljlComponent},
  {path:'jsgl',component:JsglComponent},
  {path:'jslb',component:JslbComponent},
  {path:'fpqx',component:FpqxComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule, 
    Ng2SmartTableModule,
  ], 
  providers: [DataService],  
  declarations: [BmjbxxComponent, YhlbComponent, DljlComponent, JsglComponent, JslbComponent, FpqxComponent]
})
export class XtszModule { }
