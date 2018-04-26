import { Router } from '@angular/router/';
import { LoginHelper } from 'app/utils/login-helper';
import { ApiHandlerService } from 'app/services/api-handler.service';
import { Dog } from 'app/models/dog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginPopupComponent } from 'app/popups/login-popup/login-popup.component';

@Component({
  selector: 'app-rate-dogs',
  templateUrl: './rate-dogs.component.html',
  styleUrls: ['./rate-dogs.component.css']
})
export class RateDogsComponent implements OnInit {
  dogs: Dog[];
  currDog: number;
  currImg: number;
  constructor(
    public api: ApiHandlerService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    this.api.getDogsRandom(5).subscribe(res => (this.dogs = res.data));
    this.currDog = 0;
    this.currImg = 0;
  }
  like() {
    if (LoginHelper.isLoggedIn()) {
      this.api
        .likeImage(
          this.dogs[this.currDog].images[this.currImg].uuid,
          this.dogs[this.currDog].images[this.currImg].likedBy.indexOf(
            LoginHelper.getProfile().uuid
          ) <= -1
        )
        .subscribe(res => {
          this.dogs[this.currDog].images[this.currImg].likedBy.push(
            LoginHelper.getProfile().uuid
          );
          this.next();
        });
    } else {
      let dialog = this.dialog.open(LoginPopupComponent);
    }
  }

  next() {
    this.currDog++;
    this.currImg = Math.floor(
      Math.random() * this.dogs[this.currDog].images.length
    );
    if (this.currDog == this.dogs.length - 1) {
      this.api
        .getDogsRandom(5)
        .subscribe(res => (this.dogs = this.dogs.concat(res.data)));
    }
  }
  tagClick(tag: string) {
    this.router.navigate(['otherdogs/' + tag]);
  }
  prev() {
    this.currDog--;
  }
}
