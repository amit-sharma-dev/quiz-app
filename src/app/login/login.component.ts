import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MESSAGES, PATTERN} from '../common/message';
import {LowerCasePipe} from '@angular/common';
import {Router} from '@angular/router';
import {AppService} from '../services/app.service';

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
  submitted;
  showEye = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appservice: AppService,
    private lowercasePipe: LowerCasePipe,
  ) {
    this.loginForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.pattern.email)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  ngOnInit() {
    localStorage.setItem('authToken', '');
  }

  // Form Submit Function.
  submitForm(form: FormGroup) {
    if (this.loginForm.valid) {
      this.submitted = false;
      const payload = {
        'email': this.lowercasePipe.transform(form.value.email),
        'roleId': '1',
        'password': form.value.password
      };
      this.appservice.login(payload).subscribe(
        (response) => {
          if (response.status === 200) {
            localStorage.setItem('authToken', response.json().data.token);
            this.router.navigate(['used-cloths']);
          }
        }
      );
    } else {
      this.submitted = true;
    }
  }

  // Password Eye Function.
  toggleEye() {
    this.showEye = !this.showEye;
  }

}
