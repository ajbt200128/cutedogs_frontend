import { Dog } from './../../models/dog';
import { LoginHelper } from './../../utils/login-helper';
import { ApiHandlerService } from './../../services/api-handler.service';
import { UUID } from 'angular2-uuid';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
const uuid:UUID = 'b7af88e1-7db3-47fe-8da3-06dcfc1af78a';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  @Input() username: string;
  loggedInUser: boolean;

  constructor( private api: ApiHandlerService, private route:ActivatedRoute) {
   }

   loggedInUserHandler(loggedIn:boolean){
    if (loggedIn) {
      this.loggedInUser = (LoginHelper.getProfile().username === this.user.username);
    }else{
      this.loggedInUser = false;
    }
   }


  ngOnInit() {
    let username = this.username ? this.username : this.route.snapshot.params['username'];

    this.api.getUserByUsername(username).subscribe(
      (response) => {
        this.user = response.data[0];
        this.loggedInUserHandler(LoginHelper.isLoggedIn());
        LoginHelper.loggedIn.subscribe((res) =>
          this.loggedInUserHandler(res)
        );
    });
  }

}
