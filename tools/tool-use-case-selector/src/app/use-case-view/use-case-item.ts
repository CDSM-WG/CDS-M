import { Type } from '@angular/core';
import { UseCaseTileComponent } from '../use-case-tile/use-case-tile.component';

export class UseCaseItem {
  constructor(public component: Type<UseCaseTileComponent>, public data: any, public selectable: boolean) {}
}
