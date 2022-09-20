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

  constructor(private standardService: StandardService) { }

  ngOnInit(): void {
  }

  remove() {
    let index = this.standardService.selectedStandards.findIndex(x => x.name == this.data.name);
    if (index >= 0) {
      this.standardService.selectedStandards = this.standardService.selectedStandards.splice(index, 1);
    }
  }

}
