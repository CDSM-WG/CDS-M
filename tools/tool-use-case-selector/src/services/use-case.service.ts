import { Injectable } from '@angular/core';
import { UseCaseTileComponent } from 'src/app/use-case-tile/use-case-tile.component';
import { UseCaseItem } from 'src/app/use-case-view/use-case-item';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UseCaseService {

  items: UseCaseItem[] = [];
  filter = new BehaviorSubject<string>("");
  resetfilter = new BehaviorSubject<string>("");

  selectUsecase = new BehaviorSubject<string>("");
  deselectUsecase = new BehaviorSubject<string>("");

  getUseCases() {
    return this.items;
  }

  setJson(useCases: any[]) {
    for (let index = 0; index < useCases.length; index++) {
      const element = useCases[index];
      let item = new UseCaseItem(UseCaseTileComponent, element, false);
      this.items.push(item);
    }
  }

  filterUseCases( tag : string ){
    this.filter.next( tag );
  }

  resetfilterUseCases( tag : string ){
    this.resetfilter.next( tag );
  }

  selectUseCase( json : string ) {
    this.selectUsecase.next( json );
  }

  deselectUseCase( json: string ) {
    this.deselectUsecase.next( json );
  }
}
