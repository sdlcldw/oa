import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
    public todoList:Array<any>;
    public newTodoText:string = '';
    private _todoList = [
      { text: '示例：至少写1篇学校宣传稿件，并交年级主任审核。' },
      { text: '示例：将我班级全部宿舍损坏的东西上报。' },
      { text: '示例：给肖明飞家长打电话，过周末时将学生手机留在家中！' },

    ];
    constructor() {
      this.todoList = this._todoList;
  
      this.todoList.forEach((item) => {
        item.color = this._getRandomColor();
      });
    }
    ngOnInit() {
      
     }
    getNotDeleted() {
      return this.todoList.filter((item:any) => {
        return !item.deleted
      })
    }
  
    addToDoItem($event) {
      
          // if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
      
            this.todoList.unshift({
              text: this.newTodoText,
            });
            this.newTodoText = '';
          // }
        }
    private _getRandomColor() {
      
    }
  }
  