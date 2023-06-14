import { Component, Input, OnInit } from '@angular/core';
import { UseCaseService } from 'src/services/use-case.service';
import { StandardService } from '../../services/standard.service';

@Component({
  selector: 'app-cart-ticket',
  templateUrl: './cart-ticket.component.html',
  styleUrls: ['./cart-ticket.component.css']
})
export class CartTicketComponent implements OnInit {

  @Input()
  data: any;
  totalGrade: string = "A";

  grades: string[] = ['A', 'B', 'C', 'D', 'E']

  constructor(private useCaseService: UseCaseService, private standardService: StandardService) {
  }

  ngOnInit(): void {
    this.getTotalGrade();
    this.standardService.standardRemoved.subscribe( (standardRemovedFromCart) => {
      if (standardRemovedFromCart == null) {
        return;
      }

      for( let i = 0; i < this.data.standards.length; ++i){
        if (this.data.standards[i].name === standardRemovedFromCart.name ) {
          this.data.standards[i].checked = false;
          break;
        }
      }
    } );
  }

  getTotalGrade() {
    let maxGrade = this.getGradeFromStandards(this.data.standards);
    for( let i = 0; i < this.data.metrics.length; i++){
      let metricMaxGrade = this.getGradeFromStandards(this.data.metrics[i].standards);
      if( metricMaxGrade > maxGrade ){
        maxGrade = metricMaxGrade;
      }
    }

    this.data.totalGrade = maxGrade;
    this.totalGrade = maxGrade;
  }

  getGradeFromStandards(listOfStandards: any[]){
    let maxGrade = "";
    if (listOfStandards != undefined) {
      for (let i = 0; i < listOfStandards.length; ++i) {
        if (listOfStandards[i].checked) {
          let grade = this.getGrade(listOfStandards[i].name, listOfStandards[i]);
          if (this.grades.indexOf(grade) == -1) {
            maxGrade = "?";
            break;
          }
          else if (grade > maxGrade) {
            maxGrade = grade;
          }
        }
      }
    }
    return maxGrade;
  }

  removeFromCart() {
    this.useCaseService.removeFromCart(this.data.id);
  }

  getGrade(standard: string, ucStandard: any) {
    return this.standardService.getPrivacyGrade(standard, ucStandard);
  }

  getChecked(standardObject: any) {
    return standardObject.checked;
  }

  clicked(standard: string, metric: any) {
    let s = this.getStandard(standard, metric);

    if (s != null) {
      if (s.checked === undefined) {
        s.checked = true;
      }
      else {
        s.checked = !s.checked;
        if( !s.checked) {
          this.standardService.standardRemoved.next(s);
        }
      }
    }
    this.getTotalGrade();
  }

  getStandard(name: string, metric: any) {
    let s = metric.standards.filter((x: any) => x.name === name);

    if ( s.length == 0 ) {
      s = this.data.standards.filter((x:any) => x.name === name);
    }

    if (s.length > 0){
      return s[0];
    }
    return null;
  }

  formatTags(standard: any) {
    let result = "";
    if (standard.tags != null) {
      for (let s of standard.tags) {
        let split = s.split(":")
        if (split[0] != "stage") {
          for (let part of split) {
            result = result + " #" + part;
          }
        }
      }
    }
    return result;
  }

  sortStandards =  (a: any, b: any) => {
    let standardA = this.standardService.getPrivacyGrade(a.name, a);
    let standardB = this.standardService.getPrivacyGrade(b.name, b);
    if (standardA == null || standardA == "*") {
      return 1;
    }
    else if (standardB == null || standardB == "*") {
      return -1;
    }

    if (standardA.charCodeAt(0) == standardB.charCodeAt(0)) {
      return 1;
    }

    return standardA.localeCompare(standardB);
  }
}
