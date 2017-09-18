import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleHomeComponent } from './module-home.component';
import { RouterModule } from "@angular/router";

const Routes=[
  {
    path: '',
    component: ModuleHomeComponent,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
  ],
  declarations: [ModuleHomeComponent]
})
export class HomeModule { }
