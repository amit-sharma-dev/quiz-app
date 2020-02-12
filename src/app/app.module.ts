import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {ServerURLInterceptor} from './services/interceptors/http-request-interceptor';
import {InterceptorService} from 'ng2-interceptors';
import {HttpClientModule} from '@angular/common/http';
import {XHRBackend, RequestOptions, HttpModule} from '@angular/http';
import {FlashMessagesService} from 'angular2-flash-messages';
import {LowerCasePipe} from '@angular/common';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    NgxUiLoaderModule
  ],
  providers: [
    ServerURLInterceptor,
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, ServerURLInterceptor]
    },
    FlashMessagesService,
    LowerCasePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, serverURLInterceptor: ServerURLInterceptor) {
  const service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(serverURLInterceptor);
  return service;
}
