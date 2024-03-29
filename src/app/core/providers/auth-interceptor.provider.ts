import { ClassProvider, Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ACCESS_TOKEN } from '../constants';
import { LOCAL_STORAGE } from '.';
import { UserManagementService } from '../services';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private userManagementService: UserManagementService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorage[ACCESS_TOKEN];
    if (token) {
      request = this.addToken(request, token);
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.userManagementService.logout();
        }
        return throwError(err);
      })
    );
  }

  private addToken<T>(request: HttpRequest<T>, token: any): HttpRequest<T> {
    return request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

}

export const AuthInterceptorProvider: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
