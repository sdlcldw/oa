import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "app/guard/login.guard";
import { ExitGuard } from "app/guard/exit.guard";
import { UserService } from "./service/UserService";
import { TskService } from "./service/TskService";
import { MenuGrbgComponent } from './menu-grbg/menu-grbg.component';
import { MenuXsglComponent } from './menu-xsgl/menu-xsgl.component';
import { MenuZcglComponent } from './menu-zcgl/menu-zcgl.component';
import { MenuRsglComponent } from './menu-rsgl/menu-rsgl.component';
import { MenuCwptComponent } from './menu-cwpt/menu-cwpt.component';
import { MenuXtszComponent } from './menu-xtsz/menu-xtsz.component';



const routeConfig: Routes = [
  {path: '',  pathMatch: 'full',redirectTo: 'index'},
  {path: 'login', component:LoginComponent,canActivate:[ExitGuard]},
  {path: 'index', component:IndexComponent,
    children:[
      {path:'',pathMatch: 'full',redirectTo: 'home'},
      {path:'home',loadChildren:'./module-home/module-home.module#HomeModule'},      
      {path:'grbg',loadChildren:'./module-grbg/module-grbg.module#GrbgModule'},
      {path:'xsgl',loadChildren:'./module-xsgl/module-xsgl.module#XsglModule'},
      {path:'cwpt',loadChildren:'./module-cwpt/module-cwpt.module#CwptModule'},
      {path:'xtsz',loadChildren:'./module-xtsz/module-xtsz.module#XtszModule'},
      {path:'zcgl',loadChildren:'./module-zcgl/module-zcgl.module#ZcglModule'},
    ],canActivate:[LoginGuard]
  }
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
    MenuXtszComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routeConfig,{ useHash: true }),
    NgbModule.forRoot(),
    CommonModule,
    FileUploadModule,       
  ],
  providers: [LoginGuard,ExitGuard,UserService,TskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
