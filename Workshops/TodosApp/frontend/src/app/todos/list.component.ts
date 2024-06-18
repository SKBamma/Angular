import { Component, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Todo } from './todos.types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgClass],
  template: `
    <ol>
   @for (todo of todoService.$todos(); track todo._id) {
   <li 
    [ngClass]="['todo-Item']">
    {{todo.title}}
      <br>
    <div> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      <button type="submit" (click)="navigateToDetails(todo)">Details</button>&nbsp;&nbsp;
      <button type="submit" (click)="navigateToUpdate(todo)">Update</button>&nbsp;&nbsp;
      <button type="submit" (click)="onDelete(todo._id)">Delete</button>
    </div>
   </li>
    
   } 
   </ol>
  `,
  styles: `
  .todo-Item {
    background-color: light;
    margin: 10px;
    padding: 10px;
    font: 15px;
    border: 0.05px solid red;
    border-radius: 20px;
  }`
})
export class ListComponent {
  todoService = inject(TodoService);
  readonly #notification = inject(ToastrService);
  readonly #router = inject(Router);

  constructor() {
    this.fetchTodo();
  }

  async fetchTodo() {
    this.todoService.GetTodos().subscribe(response => {
      console.log(response.data);
      if (response.success) {
        this.todoService.$todos.set(response.data);
      }
    });
  }

  onDelete(todo_id: string) {
    this.todoService.deleteTodoById(todo_id).subscribe(response => {
      if (response.success) {
        // update state
        this.todoService.$todos.update(todo =>
          todo.filter(t => t._id !== todo_id));
        //alert if ddeleted
        this.#notification.success(`Todo deleted Successgully!`);

      } else {
        this.#notification.error(`Unable to delete todo!`);
      }
    });
  }

  navigateToDetails(todo: Todo) {
    // navigate to details with data todo
    this.#router.navigate(['', 'todos', 'todo-details'], { state: todo });
  }

  navigateToUpdate(todo: Todo) {
    this.#router.navigate(['', 'todos', 'update-todo'], { state: todo });
  }
}
