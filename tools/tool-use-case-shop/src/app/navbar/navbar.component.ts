import { Component, OnInit } from '@angular/core';
import { UseCaseService } from 'src/services/use-case.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  useCaseStore: UseCaseService;

  constructor(ucs: UseCaseService) { 
    this.useCaseStore = ucs;
  }

  ngOnInit(): void {
  }

}
