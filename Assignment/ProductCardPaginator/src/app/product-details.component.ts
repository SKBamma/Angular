import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Product } from './types';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, MatCardModule],
  template: `

  <mat-card>
  <mat-card-content>Category: {{$product().category}}</mat-card-content>
  <mat-card-content>Price: {{$product().price | currency}}</mat-card-content>
  <mat-card-content>Stock: {{$product().stock}}</mat-card-content>
  <mat-card-content>Category:  Brand: {{$product().brand}}</mat-card-content>

</mat-card>

  `,
  styles: ``
})
export class ProductDetailsComponent {

  $product = input.required<Product>();
}
