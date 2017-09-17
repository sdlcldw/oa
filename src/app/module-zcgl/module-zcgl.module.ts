import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZcmxComponent } from './zcmx/zcmx.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BmEditor } from './zcmx/custom-editor/custom-editor-bm';
import { ZtEditor } from './zcmx/custom-editor/custom-editor-zt';
import { LbEditor } from './zcmx/custom-editor/custom-editor-lb';
import { LyEditor } from './zcmx/custom-editor/custom-editor-ly';
import { ZclbComponent } from './zclb/zclb.component';
import { ZclyComponent } from './zcly/zcly.component';
import { ZcztComponent } from './zczt/zczt.component';


const Routes=[
  {path:'zcmx',component:ZcmxComponent},
  {path:'zcly',component:ZclyComponent},
  {path:'zclb',component:ZclbComponent},
  {path:'zczt',component:ZcztComponent},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule, 
    Ng2SmartTableModule,  
  ],
  entryComponents: [
    BmEditor,
    ZtEditor,
    LbEditor,
    LyEditor,
  ],
  declarations: [
    ZcmxComponent,
    BmEditor,
    ZtEditor,
    LbEditor,
    LyEditor,
    ZclbComponent,
    ZclyComponent,
    ZcztComponent,
  ]
})

export class ZcglModule { }

