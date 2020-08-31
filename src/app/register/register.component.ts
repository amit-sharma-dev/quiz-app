import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MESSAGES, PATTERN } from '../common/message';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
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

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.pattern.email)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  submitForm(form: FormGroup) {
    if (this.registerForm.valid) {
      const payload = {
        'name': form.value.name,
        'email': this.lowercasePipe.transform(form.value.email),
        'password': form.value.password
      };
      console.log(payload);
      this.authenticationService.register(payload).subscribe(
        (response) => {
          console.log('response');
          console.log(response);
          if (response.status === true) {
            localStorage.setItem('authToken', response.data.token);
            this.router.navigate(['dashboard']);
          } else {
            console.log(response);
            this.submitted = true;
            this.error = response.message;
          }
        },
        (errors: any) => {
          console.log(errors);
          this.submitted = true;
          this.error = errors.error.message;
        }
      );
    } else {
      this.loading = false;
      this.router.navigate(['register']);
    }
  }
}
