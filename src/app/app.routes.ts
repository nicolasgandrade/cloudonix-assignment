import { Routes } from '@angular/router';
import { MainLoginComponent } from './features/login/containers/main-login/main-login.component';
import { MainProductsComponent } from './features/products/containers/main-products/main-products.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => MainLoginComponent,
  },
  {
    path: 'products',
    loadComponent: () => MainProductsComponent,
  },
];
