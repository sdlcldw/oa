import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BmjbxxComponent } from './bmjbxx/bmjbxx.component';
import { YhlbComponent } from './yhlb/yhlb.component';
import { DljlComponent } from './dljl/dljl.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


const Routes=[
  {path:'bmjbxx',component:BmjbxxComponent},
  {path:'yhlb',component:YhlbComponent},
  {path:'dljl',component:DljlComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule, 
    Ng2SmartTableModule,
  ],
  declarations: [BmjbxxComponent, YhlbComponent, DljlComponent]
})
export class XtszModule { }
