import { Component, inject } from '@angular/core';
import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';
import { CommunicationService } from './communication.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildOneComponent, ChildTwoComponent],
  template: `
    <h4>Welcome to {{title}}!</h4>
<app-child-one/>
<app-child-two/>


{{$quote().quote}}
    
  `,
  styles: [],
})
export class AppComponent {
  title = 'Dependency Injection and Http Client';
  // http client
  communication = inject(CommunicationService);
  $quote = toSignal(this.communication.giveMeQuote,
    {
      initialValue: { quote: 'Loading..' }
    });
}
