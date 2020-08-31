import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.currentUserDetailsFromLocalStorage();
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public currentUserDetailsFromLocalStorage() {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
  }

  login(payload) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, payload)
      .pipe(map(response => {
        if (response.token) {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          response.authdata = window.btoa(payload);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }

        return response;
      }));
  }

  logout() {
    if (!this.getAccessToken()) {
      this.http.get<any>('/auth/logout').subscribe(() => {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('/login');
        // tslint:disable-next-line: deprecation
        location.reload(true);
      });
    }
  }

  register(payload) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, payload)
      .pipe(map(response => {
        if (response.token) {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          response.authdata = window.btoa(payload);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }

        return response;
      }));
  }


  public get currentUserValue(): User {
    this.currentUserDetailsFromLocalStorage();
    return this.currentUserSubject.value;
  }

  public getAccessToken() {
    return this.currentUserValue ? this.currentUserValue.token : '';
  }
}
