import {Injectable, ViewChild} from '@angular/core';
import { Headers } from '@angular/http';
import {Interceptor, InterceptedRequest, InterceptedResponse} from 'ng2-interceptors';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';


@Injectable()
export class ServerURLInterceptor implements Interceptor {

  // Constructor function.
  constructor(
    // public spinnerService: SpinnerService,
    private ngxService: NgxUiLoaderService,
    private readonly flashMessagesService: FlashMessagesService,
    private readonly router: Router
  ) {
  }

  // Interceptor for request
  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    // this.spinnerService.showLoader.next(true);
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    // const headers = this.getHeader();
    request.options.headers = this.getHeader();
    return request;
  }

  // Interceptor for response
  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    console.log('API response ===>');
    console.log(response);
    if (response.response.status === 200) {
      this.flashMessagesService.show(response.response.json().message, {cssClass: 'alert-success custom-alert ', timeout: 3000});
    } else if (response.response.status === 0) {
      this.flashMessagesService.show('Network not available', {cssClass: 'alert-danger custom-alert ', timeout: 3000});
    } else if (response.response.status === 401) {
      this.flashMessagesService.show('Your session expired', {cssClass: 'alert-danger custom-alert ', timeout: 3000});
      this.router.navigate(['/login']);
    } else if (response.response.status === 404 || 406 || 422 || 429 || 500) {
      if (response.response.json().message) {
        this.flashMessagesService.show(response.response.json().message, {cssClass: 'alert-danger custom-alert ', timeout: 3000});
      }
    }
    // this.spinnerService.showLoader.next(false);
    this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    return response;
  }

  // Sets parameters in header if user exists.
  getHeader() {
    const headers = new Headers();
    const authToken = localStorage.getItem('authToken');
    headers.append('Content-Type', 'application/json');
    if (authToken) {
      headers.append('Authorization', authToken);
    }
    return headers;
  }
}
