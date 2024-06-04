import { Component, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-child-two',
  standalone: true,
  imports: [],
  template: `
    <p>
      child-two works!
    </p>
  `,
  styles: ``
})
export class ChildTwoComponent {
  readonly #communication = inject(CommunicationService);
  constructor() {
    console.log(this.#communication.$name());
  }
}
