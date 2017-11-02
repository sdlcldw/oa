import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { QxGuard } from "app/guard/qx.guard";
import { KqbscComponent } from './kqbsc/kqbsc.component';

const Routes=[
  {path:'kqbsc',component:KqbscComponent,canActivate:[QxGuard]},
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
  declarations: [KqbscComponent]
})
export class ZhxzModule { }
