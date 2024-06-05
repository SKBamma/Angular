import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink],
  template: `
   @for (user of users; track user; let i =$index) {
    <li><a [routerLink]="['','user',i]"> {{user}} </a></li>
   }
  `,
  styles: ``
})
export class UsersComponent {
  users = Array.from(Array(20).keys(), (v, i) => `user${i}`);
}
