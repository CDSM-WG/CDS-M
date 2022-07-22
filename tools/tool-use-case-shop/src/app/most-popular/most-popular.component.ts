import { Component, OnInit } from '@angular/core';
import { UseCaseService } from '../../services/use-case.service';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.css']
})
export class MostPopularComponent implements OnInit {

  useCases: any[] = [];

  constructor(service: UseCaseService) { 
    for (let t=0; t < 3; ++t) {
      this.useCases.push(service.useCaseList[t]);
    }
  }

  ngOnInit(): void {
  }
}
