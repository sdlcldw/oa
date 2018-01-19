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
import { LoginxsGuard } from './guard/login_xs.guard';
import { ExitxsGuard } from './guard/exit_xs.guard';
import { KsxkComponent } from './index/ksxk/ksxk.component';
import { HomeComponent } from './index/home/home.component';
import { ZtPipe } from './pipe/zt.pipe';
import { CjkcComponent } from './index/cjkc/cjkc.component';

const Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'login', component: LoginComponent, canActivate: [ExitxsGuard] },
  {
    path: 'index', component: IndexComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home',  component: HomeComponent },
      { path: 'ksxk',  component: KsxkComponent },
      { path: 'cjkc',  component: CjkcComponent },
    ], canActivate: [LoginxsGuard], resolve: { info: Xs_infoResolve },
  },
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
  declarations: [IndexComponent, LoginComponent, KsxkComponent, HomeComponent,ZtPipe, CjkcComponent],
  providers: [XsService, Xs_infoResolve, LoginxsGuard, ExitxsGuard],
})





export class XsModule { }
