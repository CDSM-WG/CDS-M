import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-black-ticket',
  templateUrl: './black-ticket.component.html',
  styleUrls: ['./black-ticket.component.css']
})
export class BlackTicketComponent implements OnInit {

  @Input()
  data: any;

  constructor() { }

  ngOnInit(): void {
  }

  getPrivacy() {
    return this.data.privacy;
  }

}
