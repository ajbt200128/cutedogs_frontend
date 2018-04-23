import { Component, OnInit } from '@angular/core';
import { LoginHelper } from 'app/utils/login-helper';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cute Dogs';
  loggedIn:boolean;
  name:string = LoginHelper.getProfile().name;
  constructor(public dialog:MatDialog){

    LoginHelper.initialize();
    LoginHelper.loggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn
      this.name = LoginHelper.getProfile().name;
    });
  }
  ngOnInit(){
    this.loggedIn = LoginHelper.isLoggedIn();
    this.name = LoginHelper.getProfile().name;
  }
  logOut(){
    LoginHelper.logOut();
    window.location.reload();
  }
}
