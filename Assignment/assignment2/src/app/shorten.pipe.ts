import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    let result: string = '';
    if (value.length > limit) {
      result = value.substring(0, limit) + "...";
    } else {
      result = value;
    }
    return result;
  }

}
