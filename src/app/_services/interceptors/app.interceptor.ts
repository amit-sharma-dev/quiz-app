import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpErrorResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '..';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!httpRequest.headers.has('Content-Type')) {
            httpRequest = httpRequest.clone({
                headers: httpRequest.headers.set('Content-Type', 'application/json')
            });
        }

        return next.handle(httpRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    localStorage.removeItem('currentUser');
                    this.router.navigateByUrl('/login');

                }
                return throwError(error.message);
            })
        );
    }
}
