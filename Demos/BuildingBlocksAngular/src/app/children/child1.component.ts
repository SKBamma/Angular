import { Component } from '@angular/core';

@Component({
  selector: 'app-child1',
  standalone: true,
  imports: [],
  template: `
    <p>
     {{title}}
    </p>
  `,
  styles: ``
})
export class Child1Component {
  title = 'Hello, from children 1';
}
