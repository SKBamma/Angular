import { Component, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from './todos.types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit) ="onAdd()">
    <br>
        <input type="text" placeholder="title" formControlName="title"/><br> <br>
        <textarea type="" placeholder="description" formControlName="description"></textarea> <br> <br> 
        completed?<input type="checkbox" placeholder="" formControlName="completed"/> <br> <br>
        <button type="submit"[disabled]="form.invalid">Add Todo</button>

    </form>
  `,
  styles: ``
})
export class AddComponent {
  todoService = inject(TodoService);
  readonly #router = inject(Router);
  readonly #notification = inject(ToastrService);

  form = inject(FormBuilder).group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    completed: [false, [Validators.required]]
  });

  onAdd() {
    // http post request
    this.todoService.postTodo(this.form.value as Todo)
      .subscribe(response => {
        if (response.success) {
          // console.log(response.data);
          // update state
          this.todoService.postTodoFromState(response.data);
          this.#notification.success("Todo added successfully!");
          this.#router.navigate(['', 'todos', 'list']);
        } else {
          this.#notification.error('Unable to add todo');
        }
      });

  }

}
