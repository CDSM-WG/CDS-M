import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @HostBinding('class.fileover') fileOver: boolean = false;
  constructor() { }

}
