import { Component, Input, OnInit } from '@angular/core';
import { UseCaseService } from 'src/services/use-case.service';

@Component({
  selector: 'app-use-case-ticket',
  templateUrl: './use-case-ticket.component.html',
  styleUrls: ['./use-case-ticket.component.css']
})
export class UseCaseTicketComponent implements OnInit {

  extended: boolean = false;

  @Input()
  data: any;

  constructor(private useCaseService: UseCaseService){

  }

  ngOnInit(): void {
  }

  addToCart() {
    this.useCaseService.addToCart(this.data.id);
  }

  getClasses() {
    if (this.useCaseService.isInCart(this.data.id)) {
      return "removeFromCart";
    }
    return "addToCart";
  }

  getContent() {
    if (this.useCaseService.isInCart(this.data.id)) {
      return "-";
    }
    return "+";
  }

  extendText(){
    this.extended = !this.extended;
  }

  getExtendedText() {
    if (this.extended) {
      return "visible";
    }
    return "invisible";
  }
}
