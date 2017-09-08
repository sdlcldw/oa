import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { GzcxComponent } from './gzcx/gzcx.component';
import { TxlComponent } from './txl/txl.component';

import {grbgRoutes} from './module-grbg.routes';
import { GjcjtxlComponent } from './gjcjtxl/gjcjtxl.component';
import { WdzsComponent } from './wdzs/wdzs.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(grbgRoutes),
  ],
  declarations: [GzcxComponent, TxlComponent, GjcjtxlComponent, WdzsComponent]
})
export class GrbgModule { }
