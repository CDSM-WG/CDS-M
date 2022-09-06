import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prepare-standard-ticket',
  templateUrl: './prepare-standard-ticket.component.html',
  styleUrls: ['./prepare-standard-ticket.component.css']
})
export class PrepareStandardTicketComponent implements OnInit {

  @Input()
  data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
