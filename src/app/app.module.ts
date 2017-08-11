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
import { XsglComponent } from './xsgl/xsgl.component';
import { CwptComponent } from './cwpt/cwpt.component';
import { ZcglComponent } from './zcgl/zcgl.component';
import { GrbgComponent } from './grbg/grbg.component';
import { RsglComponent } from './rsgl/rsgl.component';
import { CwptCjjfComponent } from './cwpt-cjjf/cwpt-cjjf.component';
import { CwptGzbscComponent } from './cwpt-gzbsc/cwpt-gzbsc.component';
import { CwptGzbwhComponent } from './cwpt-gzbwh/cwpt-gzbwh.component';
import { CwptGzcxComponent } from './cwpt-gzcx/cwpt-gzcx.component';
import { CwptGzjfComponent } from './cwpt-gzjf/cwpt-gzjf.component';
import { CwptJfzlComponent } from './cwpt-jfzl/cwpt-jfzl.component';
import { CwptSjfxComponent } from './cwpt-sjfx/cwpt-sjfx.component';
import { XsglCjxsTxxxComponent } from './xsgl-cjxs-txxx/xsgl-cjxs-txxx.component';
import { XsglCjxsComponent } from './xsgl-cjxs/xsgl-cjxs.component';
import { XsglNanssComponent } from './xsgl-nanss/xsgl-nanss.component';
import { XsglWdzsComponent } from './xsgl-wdzs/xsgl-wdzs.component';
import { XsglXxshComponent } from './xsgl-xxsh/xsgl-xxsh.component';
import { XsglZszlComponent } from './xsgl-zszl/xsgl-zszl.component';
import { IndexHomeComponent } from './index-home/index-home.component';
import { LoginGuard } from "app/guard/login.guard";
import { ExitGuard } from "app/guard/exit.guard";
import { UserService } from "./UserService";
import { ModalComponent } from './modal/modal.component';




const routeConfig: Routes = [
  {path:'modal',component:ModalComponent},
{path: '',  pathMatch: 'full',redirectTo: 'index'},
{path: 'login', component:LoginComponent,canActivate:[ExitGuard]},
{path: 'index', component:IndexComponent,
  children:[
    {path:'',pathMatch: 'full',redirectTo: 'home'},
    {path:'home',component:IndexHomeComponent},
    {path:'cjjf',component:CwptCjjfComponent},
    {path:'gzbsc',component:CwptGzbscComponent},
    {path:'gzbwh',component:CwptGzbwhComponent},
    {path:'gzcx',component:CwptGzcxComponent},
    {path:'gzjf',component:CwptGzjfComponent},
    {path:'jfzl',component:CwptJfzlComponent},
    {path:'sjfx',component:CwptSjfxComponent},
    {path:'cjxs',component:XsglCjxsComponent},    
    {path:'cjxstxxx',component:XsglCjxsTxxxComponent},
    {path:'nanss',component:XsglNanssComponent},
    {path:'wdzs',component:XsglWdzsComponent},
    {path:'xxsh',component:XsglXxshComponent},
    {path:'zszl',component:XsglZszlComponent},
  ],canActivate:[LoginGuard]
}
];
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    XsglComponent,
    CwptComponent,
    ZcglComponent,
    GrbgComponent,
    RsglComponent,
    CwptCjjfComponent,
    CwptGzbscComponent,
    CwptGzbwhComponent,
    CwptGzcxComponent,
    CwptGzjfComponent,
    CwptJfzlComponent,
    CwptSjfxComponent,
    XsglCjxsTxxxComponent,
    XsglCjxsComponent,
    XsglNanssComponent,
    XsglWdzsComponent,
    XsglXxshComponent,
    XsglZszlComponent,
    IndexHomeComponent,
    ModalComponent
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
  providers: [LoginGuard,ExitGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
