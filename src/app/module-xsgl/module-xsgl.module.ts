import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CjxsComponent } from './cjxs/cjxs.component';
import { XxshComponent } from './xxsh/xxsh.component';
import { ZszlComponent } from './zszl/zszl.component';

const Routes=[
  {path:'cjxs',component:CjxsComponent},
  {path:'xxsh',component:XxshComponent},
  {path:'zszl',component:ZszlComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CjxsComponent, XxshComponent, ZszlComponent]
})

export class XsglModule { }
