import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Welcome to {{authService.state().fullname}}!</h1>

    <button [routerLink]="['signin']">SignIn </button> &nbsp; &nbsp;
    <button [routerLink]="['signup']"> SignUp </button>

    <nav>

    </nav>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'frontend';
  readonly authService = inject(AuthService);
}
