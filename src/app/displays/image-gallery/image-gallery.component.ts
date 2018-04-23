import { UUID } from 'angular2-uuid';
import { Image } from 'app/models/image';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Dog } from 'app/models/dog';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  @Input() images: Image[];
  @Input() edit: boolean;
  @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() dog: Dog;
  @Output() imgLiked: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  imgLike() {
    this.imgLiked.emit();
  }

  delete(uuid: UUID) {
    this.images.forEach((element, index) => {
      if (element.uuid === uuid) {
        this.images.splice(index, 1);
      }
    });
    this.checkImgs(true);
  }

  checkImgs(isValid: boolean) {
    let valid = true;
    this.images.forEach(element => {
      if (!element.imageLink) {
        valid = false;
      }
    });
    if (!isValid) {
      valid = false;
    }
    this.valid.emit(valid);
  }

  addImg() {
    const imgUUID: UUID = UUID.UUID();
    const img: Image = {
      uuid: imgUUID,
      dog: this.dog.uuid,
      tags: [],
      likedBy: [],
      imageLink: ''
    };
    this.images.push(img);
    this.checkImgs(false);
  }
  getDivWidth(): string {
    return (
      360 *
        Math.min(this.images.length + 1, Math.floor(window.innerWidth / 300)) +
      'px'
    );
  }

  getWidth(): string {
    const width = Math.min(
      this.images.length + 1,
      Math.floor(window.innerWidth / 300)
    );

    return 'repeat( ' + width + ', ' + width + 'fr)';
  }
}
