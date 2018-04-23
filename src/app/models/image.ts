import { Dog } from './dog';
import { UUID } from 'angular2-uuid';
export interface Image {
  uuid: UUID;
  dog: UUID;
  tags: string[];
  likedBy: UUID[];
  imageLink: String;
}
