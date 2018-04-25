import { UUID } from 'angular2-uuid';
import { Image } from 'app/models/image';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Dog } from 'app/models/dog';
import { ElementRef } from '@angular/core/';
import { ViewChild } from '@angular/core/';


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
  @ViewChild('parent') parent: ElementRef;
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

  getWidth(): string {
    let width = Math.min(
      this.images.length,
      Math.floor(this.parent.nativeElement.offsetWidth / 300)
    );
    if (this.edit && width!== 1){
      width++;
    }
    return 'repeat( ' + width + ', ' + width + 'fr)';
  }
}
