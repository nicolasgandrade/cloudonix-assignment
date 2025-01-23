import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { filter, Observable, switchMap, tap } from 'rxjs';
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
      filter((id) => !!id),
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

  readonly createProduct = this.effect((data$: Observable<Partial<Product>>) =>
    data$.pipe(
      switchMap((product) =>
        this.productsService.createProduct(product).pipe(
          tapResponse(
            (created) => this.createItemSuccess(created),
            () => null,
          ),
        ),
      ),
    ),
  );

  readonly editProduct = this.effect((data$: Observable<Partial<Product>>) =>
    data$.pipe(
      filter((product) => !!product?.id),
      switchMap((product) =>
        this.productsService.editProduct(product.id!, product).pipe(
          tapResponse(
            (edited) => this.editProductSuccess(edited),
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

  private readonly createItemSuccess = this.updater(
    (state, created: Product) => ({
      ...state,
      list: [...state.list, created],
    }),
  );

  private readonly editProductSuccess = this.updater(
    (state, edited: Product) => ({
      ...state,
      list: state.list.map((product) =>
        product.id === edited.id ? edited : product,
      ),
    }),
  );

  constructor() {
    super(initialState);
  }
}
