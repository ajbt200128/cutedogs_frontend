import { Router } from '@angular/router/';
import { Component, OnInit } from '@angular/core';
import { LoginHelper } from 'app/utils/login-helper';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cute Dogs';
  loggedIn: boolean;
  name: string;
  activatedRoute: string = 'ratedogs';
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public location: Location
  ) {
    LoginHelper.initialize();
    LoginHelper.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      this.name = LoginHelper.getProfile().name;
    });
  }
  routeSelect(route: string) {
    this.activatedRoute = route;
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      this.activatedRoute = this.location.path().substring(1,this.location.path().length);
    });
    this.loggedIn = LoginHelper.isLoggedIn();
    this.name = LoginHelper.getProfile().name;
  }
  logOut() {
    LoginHelper.logOut();
    window.location.reload();
  }
}
