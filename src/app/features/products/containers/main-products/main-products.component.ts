import { Dialog } from '@angular/cdk/dialog';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DetailsDialogComponent } from '../../components/details-dialog/details-dialog.component';
import { Product } from '../../models/product.model';
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
  private readonly dialog = inject(Dialog);

  readonly products$ = this.productsStore.list$;
  readonly isFetching$ = this.productsStore.isFetching$;

  ngOnInit(): void {
    this.productsStore.getProducts();
  }

  openDetailsDialog(product: Product): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '300px',
      data: product,
    });
  }
}
