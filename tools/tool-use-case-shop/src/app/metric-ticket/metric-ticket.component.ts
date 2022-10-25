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
  standards: any;

  @Input()
  index: number = 0;

  collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.collapsed = this.index != 0;
    if (this.data.standards == null) {
      this.data.standards = [];
      for(let s of this.standards){
        this.data.standards.push( s );
      }
    }
    else {
      let reformatted = [];
      for( let i = 0 ; i < this.data.standards.length; i++ ){
        reformatted.push( {"name": this.data.standards[i] } );
      }
      this.data.standards = reformatted;
    }
  }

  hasDataStandards() {
    if (this.data.standards == null) {
      return false;
    }
    return this.data.standards.length > 0;
  }

  showStandards() {
    if (this.collapsed) {
      return false;
    }
    return this.hasDataStandards();
  }

  isCollapsed() {
    return this.collapsed;
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
