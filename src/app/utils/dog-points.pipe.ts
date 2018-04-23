import { element } from 'protractor';
import { Image } from 'app/models/image';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dogPoints'
})
export class DogPointsPipe implements PipeTransform {
  transform(value: Image[], args?: any): any {
    let points: number = 0;
    value.forEach(element => {
      points += element.likedBy.length;
    });
    return points;
  }
}
