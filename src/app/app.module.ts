import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule }     from '@angular/common';
import {routeConfig} from './app.routes';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from "@angular/router";
import { IndexHomeComponent } from './index-home/index-home.component';
import { LoginGuard } from "app/guard/login.guard";
import { ExitGuard } from "app/guard/exit.guard";
import { UserService } from "./service/UserService";
import { TskService } from "./service/TskService";
import { MenuGrbgComponent } from './menu-grbg/menu-grbg.component';
import { MenuXsglComponent } from './menu-xsgl/menu-xsgl.component';
import { MenuZcglComponent } from './menu-zcgl/menu-zcgl.component';
import { MenuRsglComponent } from './menu-rsgl/menu-rsgl.component';
import { MenuCwptComponent } from './menu-cwpt/menu-cwpt.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    IndexHomeComponent,
    MenuGrbgComponent,
    MenuXsglComponent,
    MenuZcglComponent,
    MenuRsglComponent,
    MenuCwptComponent
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
