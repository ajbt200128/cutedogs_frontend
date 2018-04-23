import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router/';
import { Dog } from './../../models/dog';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-dog-gallery',
  templateUrl: './dog-gallery.component.html',
  styleUrls: ['./dog-gallery.component.css']
})
export class DogGalleryComponent implements OnInit {
  @Input() dogs: Dog[];
  @Input() edit: boolean;
  @Input() owner: UUID;
  constructor(public router: Router) {}

  ngOnInit() {}
  getDivWidth(): string {
    return (
      360 * Math.min(this.dogs.length, Math.floor(window.innerWidth / 300)) +
      'px'
    );
  }
  addDog() {
    this.router.navigate(['newdog/' + this.owner]);
  }

  getWidth(): string {
    const numWidth = Math.min(
      this.dogs.length + 1,
      Math.floor(window.innerWidth / 300)
    );
    return 'repeat( ' + numWidth + ', ' + numWidth + 'fr)';
  }
}
