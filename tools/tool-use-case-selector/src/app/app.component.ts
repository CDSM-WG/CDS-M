import { Component, OnInit } from '@angular/core';
import { UseCaseService } from 'src/services/use-case.service';
import { UseCaseItem } from './use-case-view/use-case-item';
import * as data from './_files/use-cases.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'use-case-selector';
  useCases: UseCaseItem[] = [];

  constructor(private useCaseService: UseCaseService) {}

  ngOnInit() {
    let useCaseList = (data as any);
    this.useCaseService.setJson(useCaseList);
    this.useCases = this.useCaseService.getUseCases();
  }
}
