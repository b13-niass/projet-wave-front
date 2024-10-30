import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authTokenKey = environment.authTokenKey;
  const router = inject(Router);
  const token = localStorage.getItem(authTokenKey);
  console.log(token);

  const excludedPaths = ['/login', '/verifytoken'];
  const isExcludedPath = excludedPaths.some((path) => req.url.includes(path));

  if (!isExcludedPath && token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.warn('Session expired. Please log in again.');
        localStorage.removeItem(authTokenKey);
        router.navigate(['login']);
      }
      return throwError(() => error);
    })
  );
};
