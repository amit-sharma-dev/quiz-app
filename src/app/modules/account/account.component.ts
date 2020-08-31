import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './acoount.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public currentUserSubject: BehaviorSubject<User>;

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  logout() {
    // remove user from local storage and set current user to null
    this.authService.logout();
  }

}
