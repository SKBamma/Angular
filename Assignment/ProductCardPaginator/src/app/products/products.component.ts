import { Component, computed, input, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


import { Product } from '../types';
import { ShortenPipe } from '../shorten.pipe';
import { ProductDetailsComponent } from '../product-details.component';





@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule, MatCardModule,
    MatPaginatorModule, ShortenPipe, ProductDetailsComponent],

  template: `
   
   <mat-card class="example-card">
  <mat-card-header>
    <!-- <div mat-card-avatar class="example-header-image"></div> -->
    <mat-card-title>{{displayItem().title | shorten: 20}}</mat-card-title>
    
  </mat-card-header>
  <img mat-card-image [src]="displayItem().thumbnail" [alt]="displayItem().title">
  <mat-card-content>
    <p>

     {{displayItem().description | shorten: 100}}

    </p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button (click)="show()">More...</button>
    
  </mat-card-actions>
</mat-card>


<mat-paginator 
              [hidePageSize] = 'true'
              [length]="$products().length"
              [pageSize]="1"
              (page) = "changePage($event)"
              aria-label="Select page">
</mat-paginator>

@if($showDetails()){
  <app-product-details [$product] = "displayItem()"/>
}

  `
  ,


  styleUrl: `./products.component.css`
})


export class ProductsComponent {
  $products = input.required<Product[]>();

  $page = signal<number>(1);
  $showDetails = signal<boolean>(false);

  displayItem = computed<Product>(() => {
    return this.$products()[this.$page()];
  });

  // change page by clicking next arrow
  changePage(event: PageEvent) {
    this.$page.set(event.pageIndex);
  }

  show() {
    this.$showDetails.set(true);
  }

}
