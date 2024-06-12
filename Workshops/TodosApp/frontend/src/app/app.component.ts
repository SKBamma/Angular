import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { initial_State } from './auth/auth.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Welcome to {{authService.state().fullname}}!</h1>
@if(authService.is_logged_in()){
<div>
  <button [routerLink]="['', 'todos', 'list']">List</button> &nbsp;
  <button [routerLink]="['', 'todos', 'add-todo']">Add</button>  &nbsp;
  <button type="submit" (click)="onLogout()">Logout</button>  &nbsp;
</div>
}@else {
  <div>
    <button [routerLink]="['signin']">SignIn </button> &nbsp; &nbsp;
    <button [routerLink]="['signup']"> SignUp </button>
</div>
}
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  readonly authService = inject(AuthService);
  readonly #router = inject(Router);


  onLogout() {
    this.authService.state.set(initial_State);
    this.#router.navigate(['signin']);
  }
}
