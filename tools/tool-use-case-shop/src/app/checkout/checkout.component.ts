import { Component, OnInit } from '@angular/core';
import { ExportService } from 'src/services/export.service';
import { UseCaseService } from 'src/services/use-case.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  useCases: any[];
  privacy = false;
  statement = false;

  constructor(private exportService: ExportService, private useCaseService: UseCaseService) { 
    this.useCases = exportService.useCases;
  }

  ngOnInit(): void {
  }

  getGrade(uc: any){
    return this.useCaseService.getGrade(uc);
  }

  getGrandTotal() {
    return this.useCaseService.getGrandTotal();
  }

  buttonDisabled() {
    if (this.getGrandTotal() == 'A'){
      return !this.statement;
    }
    return !(this.statement && this.privacy);
  }

  toggleStatement() {
    this.statement = !this.statement;
  }

  togglePrivacy() {
    this.privacy = !this.privacy;
  }
}
