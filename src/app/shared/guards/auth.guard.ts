import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

export const authGuard: CanActivateFn = () => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  return authorizationService.isAuthorized$.pipe(
    map((isAuthorized) => isAuthorized || router.createUrlTree(['login'])),
  );
};
