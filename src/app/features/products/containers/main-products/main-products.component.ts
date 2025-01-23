import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductsStore } from '../../state/products.store';

@Component({
  selector: 'main-products',
  templateUrl: './main-products.component.html',
  styleUrl: './main-products.component.scss',
  imports: [AsyncPipe, CurrencyPipe],
  providers: [ProductsService, ProductsStore],
})
export class MainProductsComponent implements OnInit {
  private readonly productsStore = inject(ProductsStore);

  readonly products$ = this.productsStore.list$;
  readonly isFetching$ = this.productsStore.isFetching$;

  ngOnInit(): void {
    this.productsStore.getProducts();
  }
}
