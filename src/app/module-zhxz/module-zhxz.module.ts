import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { QxGuard } from "app/guard/qx.guard";
import { KqbscComponent } from './kqbsc/kqbsc.component';
import { CkkqsjComponent } from './ckkqsj/ckkqsj.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


const Routes=[
  {path:'kqbsc',component:KqbscComponent,canActivate:[QxGuard]},
  {path:'ckkqsj',component:CkkqsjComponent,canActivate:[QxGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,   
    HttpModule, 
    Ng2SmartTableModule,
  ],
  providers: [QxGuard],
  declarations: [KqbscComponent, CkkqsjComponent]
})
export class ZhxzModule { }
