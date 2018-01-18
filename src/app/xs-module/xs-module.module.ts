import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { TableModule } from 'ngx-easy-table';
import { XsService } from './service/XsService';
import { Xs_infoResolve } from './guard/xs_info.resolve';

const Routes=[
  {path:'',component:IndexComponent},  
  {path:'login',component:LoginComponent},
  {path:'index',component:IndexComponent},

];

@NgModule({
  imports: [
    RouterModule.forChild(Routes),
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    TableModule
  ],
  declarations: [IndexComponent, LoginComponent,XsService,Xs_infoResolve]
})





export class XsModule{ }
