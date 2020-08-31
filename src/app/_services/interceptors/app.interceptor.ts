import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpErrorResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!httpRequest.headers.has('Content-Type')) {
            httpRequest = httpRequest.clone({
                headers: httpRequest.headers.set('Content-Type', 'application/json')
            });
        }

        return next.handle(httpRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status !== 401) {
                    
                    // 401 handled in auth.interceptor
                    return throwError(error.message);
                }
                return throwError(error);
            })
        );
    }
}
