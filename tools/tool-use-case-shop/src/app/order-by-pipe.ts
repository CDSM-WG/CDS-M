import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
  transform(value: object[], sortFunction?: any): any[] {
    return value.sort(sortFunction);
  }
}
