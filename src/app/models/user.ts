import { UUID } from 'angular2-uuid';
import { Dog } from './dog';

export interface User {
  uuid: UUID;
  username: string;
  name: string;
  dogs: Dog[];
}
