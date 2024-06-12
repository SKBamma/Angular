import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { environment } from '../../environments/environment';
import { Todo } from './todos.types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly #http = inject(HttpClient);
  $todos = signal<Todo[]>([]);


  //methods
  postTodo(todo: Todo) {
    return this.#http.post<{ success: true, data: Todo; }>
      (environment.BACKEND_SERVER_URL + '/todos', todo);
  }
  postTodoFromState(newTodo: Todo) {
    this.$todos.update(todos => [...todos, newTodo]);
  }

  GetTodos() {
    return this.#http.get<{ success: boolean, data: Todo[]; }>
      (environment.BACKEND_SERVER_URL + '/todos');
  }

  deleteTodoById(todo_id: string) {
    return this.#http.delete<{ success: true, data: number; }>
      (environment.BACKEND_SERVER_URL + `/todos/${todo_id}`);
  }

  updateTodoById(updateTodo: Todo) {
    return this.#http.put<{ success: boolean, data: number; }>
      (`http://localhost:3000/todos/${updateTodo._id}`, updateTodo);
    // (environment.BACKEND_SERVER_URL + `/todos/${updateTodo._id}`, updateTodo);

  }
  updateTodoByIdFromState(updatetodo: Todo) {
    this.$todos.update(todos => todos.map(todo => {
      if (todo._id === updatetodo._id) {
        return updatetodo;
      } else {
        return todo;
      }
    }));

  }
}
