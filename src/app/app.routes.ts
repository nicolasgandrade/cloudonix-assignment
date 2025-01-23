import { Routes } from '@angular/router';
import { MainLoginComponent } from './features/login/containers/main-login/main-login.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => MainLoginComponent,
  },
];
