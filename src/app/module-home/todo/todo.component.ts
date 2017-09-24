import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
    public todoList:Array<any>=[];
    public newTodoText:string = '';
    public issl:boolean = false;
    private _todoList = [
      { id:0,text: '示例：本周写1篇学校宣传稿件，并交年级主任审核。',isChecked:false },
      { id:1,text: '示例：将我班级全部宿舍损坏的东西上报。' ,isChecked:false},
      { id:2,text: '示例：给肖明飞家长打电话，过周末时将学生手机留在家中！',isChecked:false },
    ];
    constructor(private http:Http) {
     
      this.http.get('/oa/basic/web/index.php?r=index/get_todo').map(res => res.json()).subscribe(data => {
        if(data.length){
          console.log(data);
          this.todoList = data.reverse();
          this.issl = false;
        }else{
           this.todoList = this._todoList;
          this.issl = true;
        }
     });
    }
    ngOnInit() {
      
     }
    getNotDeleted() {
      return this.todoList.filter((item:any) => {
        return !item.deleted
      })
    }
  
    addToDoItem() {
          if (this.newTodoText.length < 3 || this.newTodoText.length > 64) {
            alert('请输入大于3，小于64位的文字');
            return;
          }
          let newData={text:this.newTodoText}
          let myHeaders:Headers = new Headers();
          myHeaders.append("Content-Type","application/json; charset=UTF-8");
          this.http.post("/oa/basic/web/index.php?r=index/add_todo",newData, { headers: myHeaders }).toPromise().then((response) => {
             let data = response.json();
             if(data){
          this.issl = false;          
            this.todoList = data.reverse();
            }else{
            console.log('系统错误');
            }
            this.newTodoText = '';
        });
        }
        delete(id){
          console.log(id)
          let data={id:id}
          let myHeaders:Headers = new Headers();
          myHeaders.append("Content-Type","application/json; charset=UTF-8");
          this.http.post("/oa/basic/web/index.php?r=index/delete_todo",data, { headers: myHeaders }).toPromise().then((response) => {
             let data = response.json();
             if(data.length){
            this.todoList = data.reverse() ;
             }else{
              this.todoList = this._todoList;
              this.issl = true;
            }
        });
        }
        isChecked(id,isc){
          let data={id:id,isc:isc}
          let myHeaders:Headers = new Headers();
          myHeaders.append("Content-Type","application/json; charset=UTF-8");
          this.http.post("/oa/basic/web/index.php?r=index/updata_todo",data, { headers: myHeaders }).toPromise().then((response) => {
             let data = response.json();
             if(data){
            this.todoList = data.reverse() ;
            }else{
            console.log('系统错误');
            }
        });
        }
        
   
  }
  