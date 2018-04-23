import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe'
})
export class GenderPipePipe implements PipeTransform {
  transform(value: number): string {
    return value == 1 ? 'Male' : 'Female';
  }
}
