import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//this is root injector..
export class CommunicationService {
  //all the value or state can be sent to local root
  $name = signal('Kalika........');

  //for http client request
  readonly #httpClient = inject(HttpClient);
  baseUrl = `https://api.kanye.rest/`;
  giveMeQuote = this.#httpClient.get<{ quote: string; }>(this.baseUrl);

  // constructor() {
  //   console.log("constructor service..");
  // }
}
