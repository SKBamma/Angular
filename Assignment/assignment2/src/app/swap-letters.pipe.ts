import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swapLetters',
  standalone: true
})
export class SwapLettersPipe implements PipeTransform {

  transform(value: string, swapObject: { [key: string]: string; }): string {
    if (!value || !swapObject) return value;
    let result: string = '';
    for (let x of value) {
      const lowerCase = x.toLowerCase();
      result += (swapObject[lowerCase] || x);
    }
    return result;
  }

}
