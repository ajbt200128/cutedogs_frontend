import { Component, OnInit } from '@angular/core';
import { LoginHelper } from 'app/utils/login-helper';
import { User } from 'app/models/user';
import { ApiHandlerService } from 'app/services/api-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-dogs',
  templateUrl: './my-dogs.component.html',
  styleUrls: ['./my-dogs.component.css']
})
export class MyDogsComponent implements OnInit {
  user: string;
  loggedIn: boolean;
  constructor(private api: ApiHandlerService, private router: Router) {
    LoginHelper.loggedIn.subscribe(loggedIn => this.loginHandler(loggedIn));
  }
  loginHandler(loggedIn: boolean) {
    if (loggedIn) {
      this.user = LoginHelper.getProfile().username;
    }
    this.loggedIn = loggedIn;
  }
  ngOnInit() {
    this.loginHandler(LoginHelper.isLoggedIn());
  }
}
