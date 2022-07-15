import { Component } from '@angular/core';
import { UseCaseService } from '../services/use-case.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Use case store';  

  constructor(private useCaseService: UseCaseService) {}

  getCounter() {
    return this.useCaseService.cart.length;
  }
}
