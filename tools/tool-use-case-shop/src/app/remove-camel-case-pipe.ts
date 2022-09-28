import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeCamelCase'})
export class RemoveCamelCase implements PipeTransform {

  camelCaseToWords(str: string){
    if (str == null){
      return "";
    }
    let s = str.match(/^[a-z]+|[A-Z][a-z]*/g);
    if ( s == null ) {
      return "";
    }
    return s.map(function(x){
        return x.toLowerCase();
    }).join(' ');
  };

  transform(value: string): string {
    return this.camelCaseToWords(value); 
  }
}