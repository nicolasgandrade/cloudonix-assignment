import { Dialog } from '@angular/cdk/dialog';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DeletionDialogComponent } from '../../../../shared/components/deletion-dialog/deletion-dialog.component';
import { AuthorizationService } from '../../../../shared/services/authorization.service';
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
  private readonly authService = inject(AuthorizationService);
  private readonly productsStore = inject(ProductsStore);
  private readonly dialog = inject(Dialog);

  readonly products$ = this.productsStore.list$;
  readonly isFetching$ = this.productsStore.isFetching$;

  ngOnInit(): void {
    this.productsStore.getProducts();
  }

  openDetailsDialog(product: Product): void {
    this.dialog.open(DetailsDialogComponent, {
      maxWidth: '90vw',
      data: product,
    });
  }

  openDeletionDialog(product: Product): void {
    const dialogRef = this.dialog.open<{ shouldRemove: boolean }>(
      DeletionDialogComponent,
      {
        maxWidth: '90vw',
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
        width: '90vw',
        maxHeight: '90vh',
        data: product,
      },
    );

    dialogRef.closed.subscribe((receivedProduct) => {
      if (!receivedProduct) {
        return;
      }

      if (target === 'create') {
        this.productsStore.createProduct(receivedProduct);
      } else {
        this.productsStore.editProduct({ ...receivedProduct, id: product?.id });
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
