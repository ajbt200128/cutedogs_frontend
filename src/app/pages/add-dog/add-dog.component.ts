import { LoginHelper } from 'app/utils/login-helper';
import { UUID } from 'angular2-uuid';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router/';
import { Dog } from 'app/models/dog';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrls: ['./add-dog.component.css']
})
export class AddDogComponent implements OnInit {
  owner: UUID;
  dog: Dog;
  constructor(private route: ActivatedRoute,public router: Router) {

   }

  ngOnInit() {
    this.dog = new Dog();
    if (this.route.snapshot.params['owner']){
      this.owner = this.route.snapshot.params['owner'];
      if (LoginHelper.getProfile().uuid !== this.owner){
        this.router.navigate(['']);
      }
      this.dog.owner = this.owner;
    }
  }

}
