import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {xsglRoutes} from './module-xsgl.routes';
import { CjxsComponent } from './cjxs/cjxs.component';
import { XxshComponent } from './xxsh/xxsh.component';
import { ZszlComponent } from './zszl/zszl.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(xsglRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CjxsComponent, XxshComponent, ZszlComponent]
})
export class XsglModule { }
