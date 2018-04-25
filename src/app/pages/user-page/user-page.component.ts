import { ActivatedRoute } from '@angular/router/';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: string;
  constructor(public route: ActivatedRoute) {
    this.user = this.route.snapshot.params['username'];
  }

  ngOnInit() {}
}
