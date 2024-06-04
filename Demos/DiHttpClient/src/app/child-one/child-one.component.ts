import { Component, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-child-one',
  standalone: true,
  imports: [],
  template: `
    <p>
      child-one works!
    </p>
  `,
  styles: ``
})
export class ChildOneComponent {
  // ask for injector
  readonly #communication = inject(CommunicationService);

  // use the value of injector..
  constructor() {
    console.log(this.#communication.$name());
  }
}
