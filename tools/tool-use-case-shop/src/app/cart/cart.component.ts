import { Component, OnInit } from '@angular/core';
import { UseCaseService } from 'src/services/use-case.service';
import { ExportService } from '../../services/export.service';
import { StandardService } from '../../services/standard.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  selectedUseCases: any[] = [];
  totalGrade: string = "";
  grades: string[] = ['A', 'B', 'C', 'D', 'E']

  constructor(private useCaseService: UseCaseService, private exportService: ExportService, private standardService: StandardService) {
    this.selectedUseCases = this.useCaseService.cartContent;
    this.totalGrade = this.useCaseService.getGrandTotal();
  }

  ngOnInit(): void {
  }

  getCounter() {
    return this.selectedUseCases.length;
  }

  getGrandTotal() {
    return this.useCaseService.getGrandTotal();
  }

  prepareCheckout() {
    this.exportService.useCases = this.selectedUseCases;
    this.exportService.standards = this.standardService.getAllStandards();
  }

  toggle() {
    for (let i = 0; i < this.selectedUseCases.length; i++) {
      let uc = this.selectedUseCases[i];
      if (uc.standards != undefined) {
        for (let i = 0; i < uc.standards.length; ++i) {
          if (uc.standards[i].checked) {
            let grade = this.standardService.getPrivacyGrade(uc.standards[i].name, uc);
            if( grade != 'A') {
              uc.standards[i].checked = false;
            }
          }
        }
      }
    }    
  }
}
