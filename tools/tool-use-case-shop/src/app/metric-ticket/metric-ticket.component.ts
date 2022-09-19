import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metric-ticket',
  templateUrl: './metric-ticket.component.html',
  styleUrls: ['./metric-ticket.component.css']
})
export class MetricTicketComponent implements OnInit {

  @Input()
  data: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  hasDataStandards() {
    if (this.data.standards == null){
      return false;
    }
    return this.data.standards.length > 0;
  }
}
