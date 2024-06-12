import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Todo } from './todos.types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [NgClass],
  template: `
 <div [ngClass]="['todo-details']">
    <p>Id: {{todos._id}}</p>
    <p>UserId: {{todos.user_id}}</p>
    <p>Title: {{todos.title}}</p>
    <p>IsCompleted?: {{todos.completed}}</p>
 </div>
 <button type="submit" (click)="onGoBack()">goBack</button>
  `,
  styles: `
  .todo-details{
    border: 1px solid red;
    border-radius: 20px;
    width: 85%;
    padding: 10px;
    flex: 1;
    justify-content: center;
    background-color: lightyellow;
    margin: 7%;
    // align-content: center;
    align-items: center;
    // align-text: center
  }
  `
})
export class TodoDetailsComponent {
  todoService = inject(AuthService);
  readonly #router = inject(Router);

  // receive data
  todos = this.#router.getCurrentNavigation()?.extras.state as Todo;

  onGoBack() {
    this.#router.navigate(['', 'todos', 'list']);
  }

}
