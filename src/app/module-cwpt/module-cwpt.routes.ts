import { RouterModule } from '@angular/router';
import { GzbscComponent } from './gzbsc/gzbsc.component';
import { GzbwhComponent } from './gzbwh/gzbwh.component';
import { SjfxComponent } from './sjfx/sjfx.component';
import { QxGuard } from "app/guard/qx.guard";

export const cwptRoutes=[
    {path:'gzbsc',component:GzbscComponent,data:{role:'gzbsc'},canActivate:[QxGuard]},
    {path:'gzbwh',component:GzbwhComponent,data:{role:'gzbwh'},canActivate:[QxGuard]},
    {path:'sjfx',component:SjfxComponent,data:{role:'sjfx'},canActivate:[QxGuard]},
];