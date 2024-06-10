import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export type IUser = {
  _id: string,
  fullname: string,
  email: string,
  password: string;
};
export type SigninType = {
  email: string,
  password: string;
};

export type State = {
  _id: string,
  fullname: string,
  email: string,
  jwt: string;
};

export const initial_State = {
  _id: '',
  fullname: '',
  email: '',
  jwt: ''
};

export class AuthService {
  readonly #http = inject(HttpClient);
  state = signal<State>(initial_State);

  // http methods
  userSignup(newUser: IUser) {
    return this.#http.post<IUser>("", newUser);
  }

  userSignin(user: SigninType) {
    return this.#http.post<SigninType>("", user);
  }
}
