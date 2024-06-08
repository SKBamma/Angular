import { Component, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import ITodo from './types';

@Component({
  selector: 'app-addtodo',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form  [formGroup]="form" (ngSubmit)="add()">
    <!-- <input type="text"  formControlName='id'> <br> -->
      <input type="text" placeholder="todo" formControlName='todo'> <br>
      <input type="checkbox" formControlName="completed"> <br>
      <input type="number" placeholder="userid" formControlName="userId"> <br>
      <button type="submit">add</button>
    </form>
  `,
  styles: ``
})
export class AddtodoComponent {
  serviceTodo = inject(TodoService);
  readonly #router = inject(Router);

  form = inject(FormBuilder).nonNullable.group({
    // id: 0,
    todo: '',
    completed: false,
    userId: 260
  });


  add() {
    // add new todo to database
    this.serviceTodo.addNewTodo(this.form.value as ITodo).subscribe(response => {

      //update state
      // this.serviceTodo.addTodoByIdFromState(response);

    });
    this.#router.navigate(['']);
  }
}
