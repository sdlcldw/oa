import { RouterModule } from '@angular/router';
import { GzcxComponent } from './gzcx/gzcx.component';
import { TxlComponent } from './txl/txl.component';
import { WdzsComponent } from './wdzs/wdzs.component';
import { GjcjtxlComponent } from './gjcjtxl/gjcjtxl.component';



export const grbgRoutes=[
    {path:'gzcx',component:GzcxComponent,},
	{path:'txl',component:TxlComponent,},
	{path:'wdzs',component:WdzsComponent,},
	{path:'gjcjtxl',component:GjcjtxlComponent,},
];