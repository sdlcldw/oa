import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZcmxComponent } from './zcmx/zcmx.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomEditor } from './zcmx/custom-editor';


const Routes=[
  {path:'zcmx',component:ZcmxComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule, 
    Ng2SmartTableModule,  
    
  ],
  declarations: [ZcmxComponent,CustomEditor]
})

export class ZcglModule { }

