import { NgStyle } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { IHistory } from './types';
import { CheatDirective } from './cheat.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgStyle, CheatDirective],
  template: `
    <h3>Welcome to {{title}}!</h3>

  <button (click)="$display_history.set(!$display_history())">
  show/hide history</button>

  @if($display_history()){
    <button (click)="reset()">Reset</button>
  
    <table>
  <tr>
    <th>Computer</th>
    <th>Human</th>
    <th>Wins</th>
    <th>Losses</th>
  </tr>
  @for (history of $history(); track history; let odd =$odd) {
    <tr [ngStyle]="{'background-color':odd? 'grey': 'white'}">
      <td>{{history.human}}</td>
      <td>{{history.computer}}</td>
      <td>{{history.wins}}</td>
      <td>{{history.losses}}</td>
    </tr>
  }@empty {
    <tr>
      <td colspan="4">Play to see history..</td>
    </tr>
  }
</table>

  }@else{
     <div> 
       wins: {{$game_state().wins}}, losses: {{$game_state().losses}}
     </div>

     <div id="color_space" [appCheat]="$displayed_color()" 
     [ngStyle]="{'background-color': $displayed_color()}">
      <!-- {{$displayed_color()}} -->
     </div>

  @for (color of $colors(); track color) {
    <button (click)="answer(color)">{{color}}</button>
  }
}
  `,
  styles: [`#color_space {width:400px; height: 250px} 
    button { margin: 20px; margin-left: 30px}`]
})
export class AppComponent {
  title = 'Workshop -1: Color Gussing Game';
  $game_state = signal({ wins: 0, losses: 0 });
  $colors = signal<string[]>([]);
  $displayed_color = signal('#ffffff');
  $history = signal<IHistory[]>([]);
  $display_history = signal<boolean>(false);

  //game starts from here..
  constructor() {
    const stored_history = localStorage.getItem('hex');
    if (stored_history) {
      const parsed_stored_history = JSON.parse(stored_history);
      if (parsed_stored_history) {
        this.$history.set(parsed_stored_history);
        this.$game_state.set({
          wins: parsed_stored_history.at(-1).wins,
          losses: parsed_stored_history.at(-1).losses
        });
      }
    }
    // every time pick new color 
    this.#pick_new_colors();

    // save in local storage
    effect(() => {
      localStorage.setItem('hex', JSON.stringify(this.$history()));
    });
  }

  #pick_new_colors() {
    const colors = [
      this.#generateRandomHexColor(),
      this.#generateRandomHexColor(),
      this.#generateRandomHexColor(),

    ];
    const display = this.#getRandomItemFromArray(colors);
    this.$colors.set(colors);
    this.$displayed_color.set(display);
  }
  answer(color: string) {
    if (color === this.$displayed_color()) {
      this.$game_state.update(old_state => ({ ...old_state, wins: old_state.wins + 1 }));
    } else {
      this.$game_state.update(old_state => ({ ...old_state, losses: old_state.losses + 1 }));
    }
    this.$history.update(old_history => [...old_history, {
      human: color,
      computer: this.$displayed_color(),
      wins: this.$game_state().wins,
      losses: this.$game_state().losses
    }]);
    this.#pick_new_colors();
  }

  reset() {
    this.$game_state.set({ wins: 0, losses: 0 });
    this.$history.set([]);
    localStorage.clear();
  }
  #generateRandomHexColor(): string {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  }

  #getRandomItemFromArray(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
