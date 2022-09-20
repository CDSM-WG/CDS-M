import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metric-ticket',
  templateUrl: './metric-ticket.component.html',
  styleUrls: ['./metric-ticket.component.css']
})
export class MetricTicketComponent implements OnInit {

  @Input()
  data: any;

  @Input()
  index: number = 0;

  collapsed: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
    this.collapsed = this.index == 0;
  }

  hasDataStandards() {
    if (this.data.standards == null){
      return false;
    }
    return this.data.standards.length > 0;
  }

  showStandards() {
    if (this.collapsed){
      return false;
    }
    return this.hasDataStandards();
  }

  isCollapsed () {
    return this.collapsed;
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
