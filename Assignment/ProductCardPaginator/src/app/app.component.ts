import { Component, computed, signal } from '@angular/core';
import { Initail_Response, ResponseProduct } from './types';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <h1>Welcome to {{title}}!</h1>
   
    <div class="container">
       <div class="centered">
          <app-products [$products] = "$products()"/>
       </div>
    </div>

    
  `,
  styles: [],
})
export class AppComponent {
  title = 'Assignment 3 - Product Card Paginator';
  $response = signal<ResponseProduct>(Initail_Response);
  $products = computed(() => this.$response().products);

  constructor() {
    this.fetchProduct();
  }

  async fetchProduct() {
    try {
      const response = await fetch(`https://dummyjson.com/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: ResponseProduct = await response.json();
      this.$response.set(result);
    } catch (error) {
      console.log("Unable to fetch data from the given  url");
    }
  }


}
