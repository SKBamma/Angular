import { Component, computed, inject, signal } from '@angular/core';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


import { TodoService } from './todo.service';
import { NgClass } from '@angular/common';
import ITodo from './types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [MatPaginatorModule, NgClass],
  template: `
  <div>
    <button (click)="display('all')">All</button>  |
    <button (click)="display('completed')">Complete</button>  |
    <button (click)="display('incomplete')">Incomplete</button>
    <button (click)="navigateToAdd()">Add Todo</button>
  </div>
    <ol>
      @for (todo of displayed_todo(); track todo.id) {
        <li
         [ngClass]="['todo-item']">
         {{todo.todo}}
    <button (click)="navigateToUpdate(todo)">update</button>
    <button (click)="onDelete(todo.id)">delete</button>
        </li>
      }
    </ol>

  <mat-paginator [length]="serviceTodo.extras().total"
    [pageSize]="10"
    (page)='changePage($event)'
    aria-label="Select page">
  </mat-paginator>

  `,
  styles: `
  .todo-item {
    border: 1px solid;
    border-radius: 10px;
    padding: 5px;
    margin:10px;
    font:12px
  }`
})
export class TodolistComponent {
  serviceTodo = inject(TodoService);
  readonly #router = inject(Router);

  filter_display = signal('all');

  displayed_todo = computed(() => this.serviceTodo.todos().filter(todo => {
    if (this.filter_display() === 'completed') return todo.completed;
    if (this.filter_display() === 'incomplete') return !todo.completed;
    return todo;
  }));

  display(flag: string) {
    this.filter_display.set(flag);
  }
  constructor() {
    this.fetchTodos(0);
  }
  async fetchTodos(index: number) {
    this.serviceTodo.getTodos(index).subscribe(response => {
      // console.log(response);
      this.serviceTodo.extras.set({
        total: response.total,
        skip: response.skip,
        limit: response.limit
      });
      this.serviceTodo.todos.set(response.todos);
    });
  }
  changePage(event: PageEvent) {
    this.fetchTodos(event.pageIndex);
  }

  onDelete(todo_id: number) {
    this.serviceTodo.deleteTodoById(todo_id).subscribe(response => {
      console.log(response);
      if (response.isDeleted) {
        this.serviceTodo.todos.update(todo =>
          todo.filter(td => td.id !== todo_id)
        );
      }
    });

  }

  navigateToUpdate(todo: ITodo) {
    this.#router.navigate(['/update-todo'], { state: todo });
  }
  // function to navigate ton add todo
  navigateToAdd() {
    this.#router.navigate(['add-todo']);
  }
}
