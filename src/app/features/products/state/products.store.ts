import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Observable, switchMap, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

interface ProductsStoreState {
  list: Product[];
  isFetching: boolean;
}

const initialState: ProductsStoreState = {
  list: [],
  isFetching: false,
};

@Injectable()
export class ProductsStore extends ComponentStore<ProductsStoreState> {
  private readonly productsService = inject(ProductsService);

  readonly list$ = this.select(({ list }) => list);
  readonly isFetching$ = this.select(({ isFetching }) => isFetching);

  readonly getProducts = this.effect((data$) =>
    data$.pipe(
      tap(() => this.setIsFetching(true)),
      switchMap(() =>
        this.productsService.getProducts().pipe(
          tapResponse(
            (items) => this.fetchItemsSuccess(items),
            () => null,
          ),
        ),
      ),
    ),
  );

  readonly deleteProduct = this.effect((data$: Observable<number>) =>
    data$.pipe(
      switchMap((id) =>
        this.productsService.deleteProduct(id).pipe(
          tapResponse(
            () => this.deleteItemSuccess(id),
            () => null,
          ),
        ),
      ),
    ),
  );

  private readonly setIsFetching = this.updater(
    (state, isFetching: boolean) => ({
      ...state,
      isFetching,
    }),
  );
  private readonly fetchItemsSuccess = this.updater(
    (state, items: Product[]) => ({
      ...state,
      list: items,
      isFetching: false,
    }),
  );

  private readonly deleteItemSuccess = this.updater((state, id: number) => ({
    ...state,
    list: state.list.filter((item) => item.id !== id),
  }));

  constructor() {
    super(initialState);
  }
}
