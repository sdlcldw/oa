import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "app/guard/login.guard";
import { ExitGuard } from "app/guard/exit.guard";
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { IndexHomeComponent } from './index-home/index-home.component';


export const routeConfig: Routes = [
{path: '',  pathMatch: 'full',redirectTo: 'index'},
{path: 'login', component:LoginComponent,canActivate:[ExitGuard]},
{path: 'index', component:IndexComponent,
  children:[
    {path:'',pathMatch: 'full',redirectTo: 'home'},
    {path:'home',component:IndexHomeComponent},
    {path:'grbg',loadChildren:'./module-grbg/module-grbg.module#GrbgModule'},
    {path:'xsgl',loadChildren:'./module-xsgl/module-xsgl.module#XsglModule'},
    {path:'cwpt',loadChildren:'./module-cwpt/module-cwpt.module#CwptModule'},
  ],canActivate:[LoginGuard]
}
];