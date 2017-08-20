import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GzcxComponent } from './gzcx/gzcx.component';
import { TxlComponent } from './txl/txl.component';

import {grbgRoutes} from './grbg.routes';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(grbgRoutes)
  ],
  declarations: [GzcxComponent, TxlComponent]
})
export class GrbgModule { }
