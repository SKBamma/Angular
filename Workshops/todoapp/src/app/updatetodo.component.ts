import { Component, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { Router } from '@angular/router';
import ITodo from './types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatetodo',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <form  [formGroup]=" form" (ngSubmit)="update()">
    <input type="text" formControlName = 'todo'> <br>
    <input type="checkbox" formControlName = 'completed' ><br>
    <button type="submit">update</button>
    </form>
  `,
  styles: ``
})
export class UpdatetodoComponent {
  serviceTodo = inject(TodoService);
  readonly #router = inject(Router);

  //create form
  form = inject(FormBuilder).nonNullable.group({
    id: 0,
    todo: '',
    completed: false,
    userId: 0
  });

  // receive data
  todos = this.#router.getCurrentNavigation()?.extras.state as ITodo;

  constructor() {
    if (this.todos) {
      this.form.patchValue({
        id: this.todos.id,
        todo: this.todos.todo,
        completed: this.todos.completed,
        userId: this.todos.userId
      });
    }
  }
  update() {
    // updatedb
    this.serviceTodo.updateTodoById(this.form.value as ITodo).subscribe(response => {
      if (response) {
        this.serviceTodo.updateTodoFromState(this.form.value as ITodo);
      }
    });
    // navigate to list once click
    this.#router.navigate(['']);
  }
}
