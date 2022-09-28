import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UseCaseService } from '../services/use-case.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Use case store';  

  constructor(private router: Router, private useCaseService: UseCaseService) {}

  getCounter() {
    return this.useCaseService.cart.length;
  }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
        if (!(event instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
}
}
