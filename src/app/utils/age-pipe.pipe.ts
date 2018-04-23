import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipePipe implements PipeTransform {
  transform(value: Date, args?: any): string {
    value = new Date(Date.parse(value.toString()));
    return Math.abs(
      new Date(Date.now() - value.getTime()).getUTCFullYear() - 1970
    ).toString();
  }
}
