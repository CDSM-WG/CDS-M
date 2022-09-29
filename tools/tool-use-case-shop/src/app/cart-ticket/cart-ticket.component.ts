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
  }

  getTotalGrade() {
    let maxGrade = "";
    if (this.data.standards != undefined) {
      for (let i = 0; i < this.data.standards.length; ++i) {
        if (this.data.standards[i].checked) {
          let grade = this.getGrade(this.data.standards[i].name);
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
    this.data.totalGrade = maxGrade;
    this.totalGrade = maxGrade;
  }

  removeFromCart() {
    this.useCaseService.removeFromCart(this.data.id);
  }

  getGrade(standard: string) {
    return this.standardService.getPrivacyGrace(standard);
  }

  getChecked(standardObject: any) {
    return standardObject.checked;
  }

  clicked(standard: string) {
    let s = this.data.standards.filter((x: any) => x.name === standard);
    if (s != null) {
      if (s[0].checked === undefined) {
        s[0].checked = true;
      }
      else {
        s[0].checked = !s[0].checked;
      }
    }
    this.getTotalGrade();
  }

  formatTags(standard: any) {
    let result = "";
    if (standard.tags != null) {
      for (let s of standard.tags) {
        let split = s.split(":")
        for (let part of split) {
          result = result + " #" + part;
        }
      }
    }
    return result
  }
}
