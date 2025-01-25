import { Routes } from '@angular/router';
import { MainLoginComponent } from './features/login/containers/main-login/main-login.component';
import { MainProductsComponent } from './features/products/containers/main-products/main-products.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => MainLoginComponent,
  },
  {
    path: 'products',
    loadComponent: () => MainProductsComponent,
    canActivate: [authGuard],
  },
];
