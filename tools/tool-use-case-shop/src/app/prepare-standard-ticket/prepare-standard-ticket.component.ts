import { Component, Input, OnInit } from '@angular/core';
import { StandardService } from 'src/services/standard.service';

@Component({
  selector: 'app-prepare-standard-ticket',
  templateUrl: './prepare-standard-ticket.component.html',
  styleUrls: ['./prepare-standard-ticket.component.css']
})
export class PrepareStandardTicketComponent implements OnInit {

  @Input()
  data: any;
  
  expanded: boolean = false;

  constructor(private standardService: StandardService) { }

  ngOnInit(): void {
  }

  remove() {
    this.standardService.deselectStandard(this.data);
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}
