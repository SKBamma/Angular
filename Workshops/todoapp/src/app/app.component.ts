import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h3> {{title}}</h3>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Todo App';
}
