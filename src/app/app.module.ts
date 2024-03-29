import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { BasicAuthInterceptor } from '../app/_services/interceptors/basic-auth.interceptor';
import { LowerCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AppInterceptor } from './_services/interceptors/app.interceptor';
import { HeaderComponent } from './_shared/header/header.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TopicComponent } from './modules/topic/topic.component';
import { ToastrModule } from 'ngx-toastr';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderService } from './_services/loader.service';
import { LoaderInterceptor } from './_services/interceptors/loader-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TopicComponent,
    MyLoaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      enableHtml: true,
    }),
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    LowerCasePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
