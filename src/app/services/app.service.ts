import {Injectable} from '@angular/core';
import {InterceptorService} from 'ng2-interceptors';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public httpIntercepted: InterceptorService
  ) {
  }

  // Login API
  login(userData: any) {
    return this.httpIntercepted.post(environment.apiEndPoint + 'auth/login', userData);
  }

  // Forgot Password API
  forgotPassword(userData: any) {
    return this.httpIntercepted.post(environment.apiEndPoint + 'auth/forgot-password', userData);
  }

  register(userData: any) {
    return this.httpIntercepted.post(environment.apiEndPoint + 'auth/register', userData);
  }
}
