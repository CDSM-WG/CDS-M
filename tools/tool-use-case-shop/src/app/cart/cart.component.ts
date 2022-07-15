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
  
  constructor(private useCaseService: UseCaseService, private exportService: ExportService, private standardService: StandardService) { }

  ngOnInit(): void {
    this.selectedUseCases = this.useCaseService.cartContent;
    this.getGrandTotal();
  }

  getCounter() {
    return this.selectedUseCases.length;
  }

  getGrandTotal() {
    let grade = "";
    for( let i = 0; i < this.selectedUseCases.length; i++ ){
      if (this.selectedUseCases[i].totalGrade > grade) {
        grade = this.selectedUseCases[i].totalGrade;
      }
    }
    this.totalGrade = grade;
    return grade;
  }

  export() {
    this.exportService.useCases = this.selectedUseCases;
    this.exportService.standards = this.standardService.getAllStandards();
    this.exportService.export();
  }
}
