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
      { text: 'Check me out' },
      { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
      { text: 'Ex has semper alterum, expetenda dignissim' },
      { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
      { text: 'Simul erroribus ad usu' },
      { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
      { text: 'Get in touch with akveo team' },
      { text: 'Write email to business cat' },
      { text: 'Have fun with blur admin' },
      { text: 'What do you think?' },
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
      
          if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
      
            this.todoList.unshift({
              text: this.newTodoText,
              color: this._getRandomColor(),
            });
            this.newTodoText = '';
          }
        }
    private _getRandomColor() {
      
    }
  }
  