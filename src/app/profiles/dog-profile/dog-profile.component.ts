import { Image } from './../../models/image';
import { LoginHelper } from './../../utils/login-helper';
import { ApiHandlerService } from './../../services/api-handler.service';
import { UUID } from 'angular2-uuid';
import { Dog } from './../../models/dog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.component.html',
  styleUrls: ['./dog-profile.component.css']
})
export class DogProfileComponent implements OnInit {
  @Input() dog: Dog;
  @Input() new: boolean;
  ownerUsername: string;
  @Input() edit: boolean;
  loggedInUser: boolean;
  oldDog: Dog;
  imgsValid: boolean = true;

  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private route: ActivatedRoute,
    private api: ApiHandlerService,
    private router: Router
  ) {}
  ngOnInit() {
    if (this.route.snapshot.params['action']) {
      this.edit = this.route.snapshot.params['action'] === 'edit';
    }
    if (this.route.snapshot.params['uuid'] && !this.new) {
      this.api.getDog(this.route.snapshot.params['uuid']).subscribe(data => {
        this.dog = data.data[0];
        this.dog.birthday = new Date(this.dog.birthday);
        this.oldDog = { ...this.dog };
        this.api
          .getUser(this.dog.owner)
          .subscribe(owner => (this.ownerUsername = owner.data[0].username));
        LoginHelper.loggedIn.subscribe(loggedIn => this.loginHandler(loggedIn));
        this.loginHandler(LoginHelper.isLoggedIn());
      });
    } else {
      this.oldDog = { ...this.dog };
      this.api
        .getUser(this.dog.owner)
        .subscribe(owner => (this.ownerUsername = owner.data[0].username));
    }
  }
  updateImgs() {
    if (!this.new) {
      this.api.getDog(this.route.snapshot.params['uuid']).subscribe(data => {
        this.dog = data.data[0];
        this.dog.birthday = new Date(this.dog.birthday);
        this.oldDog = { ...this.dog };
        this.api
          .getUser(this.dog.owner)
          .subscribe(owner => (this.ownerUsername = owner.data[0].username));
        LoginHelper.loggedIn.subscribe(loggedIn => this.loginHandler(loggedIn));
        this.loginHandler(LoginHelper.isLoggedIn());
      });
    }
  }
  checkImgs(valid: boolean) {
    this.imgsValid = valid && this.dog.images != null;
  }

  loginHandler(loggedIn: boolean) {
    this.loggedInUser = loggedIn
      ? LoginHelper.getProfile().uuid.toString() === this.dog.owner.toString()
      : false;
  }

  editMode() {
    console.log(JSON.stringify(this.dog.images));
    this.edit = true;

    this.oldDog = { ...this.dog };
  }
  save() {
    if (!this.new) {
      this.api
        .putDog(this.dog, this.ownerUsername)
        .subscribe(
          res => console.log(JSON.stringify(res)),
          error => console.log(JSON.stringify(error))
        );
      this.edit = false;

      this.oldDog = { ...this.dog };
    } else {
      this.api.addDog(this.dog, this.ownerUsername).subscribe(
        res => {
          console.log(JSON.stringify(res));
        },
        error => console.log(JSON.stringify(error))
      );
      this.router.navigate(['dog/' + this.dog.uuid]);
    }
  }

  cancel() {
    this.dog = { ...this.oldDog };
    this.oldDog = { ...this.dog };
    this.edit = false;
    if (this.new) {
      window.history.back();
    }
  }

  delete() {
    this.api
      .deleteDog(this.dog.uuid, this.ownerUsername)
      .subscribe(
        res => this.router.navigate(['/mydogs']),
        error => console.log(JSON.stringify(error))
      );
  }

  addChip(event: MatChipInputEvent, likes: boolean): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if (likes) {
        this.dog.dogLikes.push(value.trim());
      } else {
        this.dog.dogDislikes.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeChip(item: any, likes: boolean): void {
    var index;
    index = likes
      ? this.dog.dogLikes.indexOf(item)
      : this.dog.dogDislikes.indexOf(item);
    if (index >= 0) {
      if (likes) {
        this.dog.dogLikes.splice(index, 1);
      } else {
        this.dog.dogDislikes.splice(index, 1);
      }
    }
  }
}
