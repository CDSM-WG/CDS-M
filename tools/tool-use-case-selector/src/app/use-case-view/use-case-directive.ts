import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[useCaseHost]',
})
export class UseCaseDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}