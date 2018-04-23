import { UUID } from 'angular2-uuid';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePoints'
})
export class ImagePointsPipe implements PipeTransform {

  transform(value: UUID[], args?: any): any {
    return value.length;
  }

}
