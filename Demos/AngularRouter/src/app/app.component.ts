import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <nav>
      <li><a [routerLink]="['']" routerLinkActive="yellow" 
      [routerLinkActiveOptions]="{exact:true}" >Home</a></li>

      <li><a [routerLink]="['', 'about']" routerLinkActive="yellow"
      [routerLinkActiveOptions]="{exact:true}">About</a></li>

      <li><a [routerLink]="['', 'users']" routerLinkActive="yellow"
      [routerLinkActiveOptions]="{exact:true}" 
      [queryParams]="{name:'Kamal'}"
      >Users</a></li>

    </nav>
    <router-outlet />
  `,
  styles: [`.yellow {background-color: yellow}`],
})
export class AppComponent {
  title = 'Angular Router';
}
