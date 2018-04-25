import { ViewChild } from '@angular/core/';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router/';
import { Dog } from './../../models/dog';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core/';

@Component({
  selector: 'app-dog-gallery',
  templateUrl: './dog-gallery.component.html',
  styleUrls: ['./dog-gallery.component.css']
})
export class DogGalleryComponent implements OnInit {
  @Input() dogs: Dog[];
  @Input() edit: boolean;
  @Input() owner: UUID;
  @ViewChild('parent') parent: ElementRef;
  constructor(public router: Router) {}

  ngOnInit() {}
  getDivWidth(): string {
    return (
      360 *
        Math.min(this.dogs.length, Math.floor(parent.innerWidth / 300)) +
      'px'
    );
  }
  addDog() {
    this.router.navigate(['newdog/' + this.owner]);
  }

  getWidth(): string {
    const modifier = this.edit ? 1 : 0;
    const numWidth = Math.min(
      this.dogs.length + modifier,
      Math.floor(parent.innerWidth / 300)
    );
    return 'repeat( ' + numWidth + ', ' + numWidth + 'fr)';
  }
}
