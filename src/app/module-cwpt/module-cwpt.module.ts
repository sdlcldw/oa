import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GzbscComponent } from './gzbsc/gzbsc.component';
import { cwptRoutes} from './module-cwpt.routes';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { GzbwhComponent } from './gzbwh/gzbwh.component';
import { HttpModule } from '@angular/http';
import { SjfxComponent } from './sjfx/sjfx.component';
import { QxGuard } from "app/guard/qx.guard";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(cwptRoutes),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,   
    HttpModule, 
  ],
  providers: [QxGuard],
  declarations: [GzbscComponent, GzbwhComponent, SjfxComponent]
})
export class CwptModule { }
