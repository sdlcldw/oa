import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BmjbxxComponent } from './bmjbxx/bmjbxx.component';


const Routes=[
  {path:'bmjbxx',component:BmjbxxComponent},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    FormsModule,
    ReactiveFormsModule, 
  ],
  declarations: [BmjbxxComponent]
})
export class XtszModule { }
