import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "./guard/login.guard";
import { ExitGuard } from "./guard/exit.guard";
import { UserService } from "./service/UserService";
import { TskService } from "./service/TskService";
import { MenuGrbgComponent } from './index/menu/menu-grbg/menu-grbg.component';
import { MenuXsglComponent } from './index/menu/menu-xsgl/menu-xsgl.component';
import { MenuZcglComponent } from './index/menu/menu-zcgl/menu-zcgl.component';
import { MenuRsglComponent } from './index/menu/menu-rsgl/menu-rsgl.component';
import { MenuCwptComponent } from './index/menu/menu-cwpt/menu-cwpt.component';
import { MenuZhxzComponent } from './index/menu/menu-zhxz/menu-zhxz.component';
import { MenuXtszComponent } from './index/menu/menu-xtsz/menu-xtsz.component';
import { User_infoResolve } from './guard/user_info.resolve';
import { QxGuard } from './guard/qx.guard';
import { SeekpasswordComponent } from './seekpassword/seekpassword.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/bs-moment/i18n/zh-cn';
import { IndexXsComponent } from './index-xs/index-xs.component';
import { LoginXsComponent } from './login-xs/login-xs.component';
defineLocale('zh-cn', zhCn); //ngx-bootstrap 语言设置
const routeConfig: Routes = [
  {path: '',  pathMatch: 'full',redirectTo: 'index'},
  {path: 'login', component:LoginComponent,canActivate:[ExitGuard]},
  {path: 'seekpw', component:SeekpasswordComponent,canActivate:[ExitGuard]},
  {path: 'index', component:IndexComponent,
    children:[
      {path:'',pathMatch: 'full',redirectTo: 'home'},
      {path:'home',loadChildren:'./module-home/module-home.module#HomeModule'},      
      {path:'grbg',loadChildren:'./module-grbg/module-grbg.module#GrbgModule'},
      {path:'xsgl',loadChildren:'./module-xsgl/module-xsgl.module#XsglModule'},
      {path:'cwpt',loadChildren:'./module-cwpt/module-cwpt.module#CwptModule'},
      {path:'xtsz',loadChildren:'./module-xtsz/module-xtsz.module#XtszModule'},
      {path:'zcgl',loadChildren:'./module-zcgl/module-zcgl.module#ZcglModule'},
      {path:'zhxz',loadChildren:'./module-zhxz/module-zhxz.module#ZhxzModule'},
    ],canActivate:[LoginGuard],resolve:{info:User_infoResolve},
  },
  {path: 'login-xs', component:LoginXsComponent},  
  {path: 'index-xs', component:IndexXsComponent},  
  ];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    MenuGrbgComponent,
    MenuXsglComponent,
    MenuZcglComponent,
    MenuRsglComponent,
    MenuCwptComponent,
    MenuXtszComponent,
    SeekpasswordComponent,
    MenuZhxzComponent,
    IndexXsComponent,
    LoginXsComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routeConfig,{ useHash: true }),
    CommonModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [LoginGuard,ExitGuard,UserService,TskService,User_infoResolve,QxGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
