import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import ITodo, { GetResponseType } from './types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //router
  readonly #http = inject(HttpClient);
  #baseUrl = 'https://dummyjson.com/todos';

  // state
  todos = signal<ITodo[]>([]);
  extras = signal({ total: 0, skip: 0, limit: 0 });

  // HTTP methods

  getTodos(page = 0, limit: number = 10) {
    return this.#http.get<GetResponseType>
      (`${this.#baseUrl}?limit=${limit}&skip=${page * 10}`);
  }

  // delete
  deleteTodoById(id: number) {
    return this.#http.delete<ITodo & { isDeleted: true; }>
      (`${this.#baseUrl}/${id}`);
  }
  // update db
  updateTodoById(updateTodo: ITodo) {
    return this.#http.put<ITodo>(`${this.#baseUrl}/${updateTodo.id}`, updateTodo);
  }
  // update from state
  updateTodoFromState(newTodo: ITodo) {
    this.todos.update(todos => todos.map(todo => {
      if (todo.id === newTodo.id) {
        return newTodo;
      } else {
        return todo;
      }
    }));
  }

  //add todo
  addNewTodo(todo: ITodo) {
    return this.#http.post('https://dummyjson.com/todos/add', todo);
  }
  // add todo by id from state(update state)
  addTodoByIdFromState(newTodo: ITodo) {
    this.todos.update(todos => [...todos, newTodo]);
  }
}
