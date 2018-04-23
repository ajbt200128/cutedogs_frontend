import { User } from './user';
import { Image } from './image';
import { UUID } from 'angular2-uuid';

export class Dog {
  profilePictureLink: string;
  owner: UUID;
  name: UUID;
  gender: number;
  birthday: Date;
  breed: string;
  dogLikes: string[];
  dogDislikes: string[];
  biography: string;
  images: Image[];
  uuid: UUID;
  constructor() {
    this.uuid = UUID.UUID();
    this.dogLikes = [];
    this.dogDislikes = [];
    this.images = [];
    this.name = '';
    this.gender = 1;
  }
}
