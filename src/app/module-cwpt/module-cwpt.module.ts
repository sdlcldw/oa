import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GzbscComponent } from './gzbsc/gzbsc.component';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { GzbwhComponent } from './gzbwh/gzbwh.component';
import { HttpModule } from '@angular/http';
import { SjfxComponent } from './sjfx/sjfx.component';
import { QxGuard } from "app/guard/qx.guard";

const Routes=[
  {path:'gzbsc',component:GzbscComponent,data:{role:'gzbsc'},canActivate:[QxGuard]},
  {path:'gzbwh',component:GzbwhComponent,data:{role:'gzbwh'},canActivate:[QxGuard]},
  {path:'sjfx',component:SjfxComponent,data:{role:'sjfx'},canActivate:[QxGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,   
    HttpModule, 
  ],
  providers: [QxGuard],
  declarations: [GzbscComponent, GzbwhComponent, SjfxComponent]
})
export class CwptModule { }
