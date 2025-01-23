import { Dialog } from '@angular/cdk/dialog';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DeletionDialogComponent } from '../../../../shared/components/deletion-dialog/deletion-dialog.component';
import { DetailsDialogComponent } from '../../components/details-dialog/details-dialog.component';
import { EditCreateDialogComponent } from '../../components/edit-create-dialog/edit-create-dialog.component';
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
    this.dialog.open(DetailsDialogComponent, {
      width: '300px',
      data: product,
    });
  }

  openDeletionDialog(product: Product): void {
    const dialogRef = this.dialog.open<{ shouldRemove: boolean }>(
      DeletionDialogComponent,
      {
        width: '300px',
        data: product,
      },
    );

    dialogRef.closed.subscribe((result) =>
      result?.shouldRemove
        ? this.productsStore.deleteProduct(product.id!)
        : null,
    );
  }

  openEditCreateDialog(target: 'create' | 'edit', product?: Product): void {
    const dialogRef = this.dialog.open<Partial<Product>>(
      EditCreateDialogComponent,
      {
        width: '300px',
        data: product,
      },
    );

    dialogRef.closed.subscribe((product) => {
      if (!product) {
        return;
      }

      if (target === 'create') {
        this.productsStore.createProduct(product);
      }
    });
  }
}
