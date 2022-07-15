import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { UseCaseService } from 'src/services/use-case.service';

import { UseCaseItem } from './use-case-item';

@Component({
  selector: 'app-use-case-view',
  templateUrl: './use-case-view.component.html',
  styleUrls: ['./use-case-view.component.css']
})
export class UseCaseViewComponent  {

  @Input() useCases: UseCaseItem[] = [];

  constructor(service: UseCaseService) {
    service.filter.subscribe(x => this.filterUseCases(x, true));
    service.resetfilter.subscribe(x => this.filterUseCases(x, false));
  }

  filterUseCases(x: string, b: boolean): void {
    for( let i = 0; i < this.useCases.length; ++i){
      let tags: string[] = this.useCases[i].data.tags;
      let found = false;
      for(let i = 0; i < tags.length; ++i){
        if (tags[i] == x) {
          found = true;
        }
      }
      if( found ) {
        this.useCases[i].selectable = b;      
      }
    }
  }
}
