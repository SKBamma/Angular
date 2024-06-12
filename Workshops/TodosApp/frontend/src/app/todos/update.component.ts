import { Component, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Todo } from './todos.types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onUpdate()">
      
    <div>
    <br>
        <input type="text" formControlName="title" > <br> <br>
        <textarea type="text" formControlName="description" ></textarea> <br> <br>
        Completed?:<input type="checkbox" formControlName="completed"> <br> <br>
        <button type="submit">update</button>
    </div>
    </form>
  `,
  styles: ``
})
export class UpdateComponent {
  todoService = inject(TodoService);
  readonly #router = inject(Router);
  readonly #notification = inject(ToastrService);

  form = inject(FormBuilder).group({
    _id: '',
    title: '',
    description: '',
    completed: false
  });

  // receive todo data from list
  todos = this.#router.getCurrentNavigation()?.extras.state as Todo;

  constructor() {
    if (this.todos) {
      this.form.patchValue({
        title: this.todos.title,
        description: this.todos.description,
        completed: this.todos.completed
      });
    }
  }

  onUpdate() {
    console.log("Hello World!");
    this.todoService.updateTodoById(this.form.value as Todo)
      .subscribe(response => {
        if (response.success) {

          this.todoService.updateTodoByIdFromState(this.form.value as Todo);

          this.#notification.success(`Todo updated successfully!`);
          this.#router.navigate(['', 'todos', 'list']);

        } else {
          this.#notification.error(`Unable to update todo!`);
        }
      });

  }
}
