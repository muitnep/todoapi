import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoService} from "./todo.service";
import {Todo} from "./todo";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  todos: Todo[] = []

   form: FormGroup = new FormGroup({
     description: new FormControl( '',[Validators.required, Validators.minLength(5)])
   })

  constructor(private service: TodoService) { }

  ngOnInit() {
    this.listTodos();
  }

  listTodos() {
    this.service.list().subscribe(todoList => {
      this.todos = todoList
    })
  }

  submit() {
     console.log(this.form.value)
     const todo: Todo = {...this.form.value}
      this.service
        .save(todo)
        .subscribe(savedTodo => {
          this.todos.push(savedTodo)
          this.form.reset()
        })
  }

  delete(todo: Todo) {
    if(confirm('Deseja mesmo deletar a tarefa?'))
    this.service
      .delete(todo.id)
      .subscribe(  (response) => {
     this.listTodos()
    })
  }

  done(todo: Todo) {
    this.service.markAsConcluded(todo.id).subscribe(updatedTodo => {
      todo.done = updatedTodo.done
      todo.doneDate = updatedTodo.doneDate
    })
  }
}
