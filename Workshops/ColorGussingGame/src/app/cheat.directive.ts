import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appCheat]',
  standalone: true
})

export class CheatDirective {

  appCheat = input.required<string>();
  @HostListener('dblclick') handle() {
    window.alert(this.appCheat());
  }

}
