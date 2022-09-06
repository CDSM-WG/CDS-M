import { Component, Input, OnInit } from '@angular/core';
import { UseCaseService } from 'src/services/use-case.service';

@Component({
  selector: 'app-use-case-ticket',
  templateUrl: './use-case-ticket.component.html',
  styleUrls: ['./use-case-ticket.component.css']
})
export class UseCaseTicketComponent implements OnInit {

  @Input()
  data: any;

  constructor(private useCaseService: UseCaseService){

  }

  ngOnInit(): void {
  }

  addToCart() {
    this.useCaseService.addToCart(this.data.id);
  }

  isAdded() {
    return this.useCaseService.isInCart(this.data.id);
  }
}
