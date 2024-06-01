import { Component, computed, effect, signal } from '@angular/core';
import { ShortenPipe } from './shorten.pipe';
import { SwapLettersPipe } from './swap-letters.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShortenPipe, SwapLettersPipe],
  template: `
    <h3>Welcome to {{title}}!</h3>
    <h3>Count:  {{$count()}}!</h3>
    <h3>Is Prime? :  {{$is_Prime()}}!</h3>
    <h3>Shorten Pipe :  {{"Welcome to my Angular Repo" | shorten: 10 }}</h3>
    <h3>Shorten Pipe :  {{"Welcome." | shorten: 20 }}</h3>
    <h3>Swap :  {{"Sontosh Bammanaa" | swapLetters:{'s':'$','a': '@', 'o':'0'} }}</h3>
    
  `,
  styles: [],
})
export class AppComponent {
  title = 'Suresh - Assignment-2';

  $count = signal<number>(0);

  $is_Prime = computed(() =>
    this.isPrime(this.$count()));

  constructor() {
    setInterval(() => {
      this.$count.update(old => old + 1);

    }, 15000);
    effect(() => {
      if (this.$is_Prime())
        console.log(`Found a Prime Number ${this.$count()}`);
    });
  }

  isPrime = (num: number): boolean => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  };

  ngOnIt() {
    console.log(`Found a Prime Number ${this.$count()}`);
  }
}
