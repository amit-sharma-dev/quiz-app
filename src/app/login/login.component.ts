import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MESSAGES, PATTERN } from '../common/message';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables.
  loginForm: FormGroup;
  messages = MESSAGES;
  pattern = PATTERN;
  submitted = false;
  showEye = true;
  loading = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lowercasePipe: LowerCasePipe,
    private authenticationService: AuthenticationService
  ) {


    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.pattern.email)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    // localStorage.setItem('authToken', '');
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Form Submit Function.
  submitForm(form: FormGroup) {
    if (this.loginForm.valid) {
      const payload = {
        'email': this.lowercasePipe.transform(form.value.email),
        'password': form.value.password
      };
      console.log(payload);
      this.authenticationService.login(payload).subscribe(
        (response) => {
          console.log('response');
          console.log(response);
          if (response.status === true) {
            localStorage.setItem('authToken', response.data.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.log('response');
            console.log(response);
            this.error = response.message;
          }
        },
        (errors: any) => {
          console.log('errors');
          console.log(errors.error);
          this.submitted = true;
          if (errors.error.errors.password) {
            this.error = errors.error.errors.password[0];
          } else if (errors.error.errors.email) {
            this.error = errors.error.errors.email[0];
          } else {
            this.error = errors.error.message;
          }
        }
      );
    } else {
      this.loading = false;
      this.router.navigate(['login']);
    }
  }

  // Password Eye Function.
  toggleEye() {
    this.showEye = !this.showEye;
  }

  register() {
    this.router.navigate(['/register']);
  }

}
