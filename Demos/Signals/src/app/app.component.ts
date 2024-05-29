import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h3>Welcome to {{$title()}}!</h3>
    <h3>My favorates Fruits are {{$fruit()}}</h3>
  
    <h3> Count: {{$number()}}</h3>
    <h3>Is Even? :{{$is_Even()}}

    
  `,
  styles: [],
})
export class AppComponent {
  $title = signal('Practicing Signals in Angular!');
  $fruit = signal('Mango');
  $number = signal(50);

  $is_Even = computed(() => this.$number() % 2 === 0); // readoly

  // how to make chnage the signal
  constructor() {
    setTimeout(() => {
      this.$title.set('changing the value of signal using set!');
    }, 2000);
    setTimeout(() => {
      this.$fruit.update(old => old + ' ' + "and" + ' ' + 'Banana!');
    }, 3000);

    setInterval(() => this.$number.update(old => old + 1), 5000);
  }
}
