import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleHomeComponent } from './module-home.component';
import { RouterModule } from "@angular/router";
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './weather/weather.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CarouselComponent } from './carousel/carousel.component';
import { DcwjComponent } from './dcwj/dcwj/dcwj.component';

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
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ModuleHomeComponent, 
    TodoComponent,
    WeatherComponent,
    CarouselComponent,
    DcwjComponent]
})
export class HomeModule { }
