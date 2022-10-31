import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceUnderscore'})
export class ReplaceUnderscorePipe implements PipeTransform {
  transform(value: any): string {
    if ( value instanceof Object ){
      return value;
    }
    return value? value.replace(/-/g, " ") : value;
  }
}