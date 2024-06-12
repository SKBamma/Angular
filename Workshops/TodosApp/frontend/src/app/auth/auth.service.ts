import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';

import { environment } from '../../environments/environment';
import { IUser, SigninType, State, initial_State } from './auth.types';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  readonly #http = inject(HttpClient);
  state = signal<State>(initial_State);

  constructor() {
    effect(() => {
      localStorage.setItem("AppTodo", JSON.stringify(this.state()));
    });
  }


  // http methods
  userSignup(newUser: IUser) {
    return this.#http.post<{ success: boolean, data: IUser; }>
      (environment.BACKEND_SERVER_URL + '/auth/signup', newUser);
  }

  userSignin(user: SigninType) {
    return this.#http.post<{ success: true, data: string; }>
      (environment.BACKEND_SERVER_URL + '/auth/signin', user);
  }

  is_logged_in() {
    return this.state()._id ? true : false;
  }
}
