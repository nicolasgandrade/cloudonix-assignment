import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

export function bearerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return inject(AuthorizationService).authToken.pipe(
    take(1),
    switchMap((token) => {
      const reqWithBearerHeader = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next(reqWithBearerHeader);
    }),
  );
}
