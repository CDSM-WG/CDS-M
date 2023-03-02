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
    this.sort();
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

  standards() {
    let standards: any[] = this.data.standards;
    if (standards == null || standards.length == 0) {
      standards = []
      for (let i = 0; i < this.data.metrics.length; ++i) {
        for (let j = 0; j < this.data.metrics[i].standards.length; ++j) {
          standards.push(this.data.metrics[i].standards[j]);
        }
      }
    }

    return standards;
  }

  sort() {
    this.data.standards = this.standards().sort((a: any, b: any) => {
      let standardA = this.standardService.getPrivacyGrade(a.name, a);
      let standardB = this.standardService.getPrivacyGrade(b.name, b);
      if (standardA == null || standardA == "*") {
        return 1;
      }
      else if (standardB == null || standardB == "*") {
        return -1;
      }

      if (standardA.charCodeAt(0) == standardB.charCodeAt(0)) {
        return a.name.localeCompare(b.name);
      }

      return standardA.localeCompare(standardB);
    });
  }

  getTotalGrade() {
    let maxGrade = "";
    if (this.data.standards != undefined) {
      for (let i = 0; i < this.data.standards.length; ++i) {
        if (this.data.standards[i].checked) {
          let grade = this.getGrade(this.data.standards[i].name, this.data.standards[i]);
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

  getGrade(standard: string, ucStandard: any) {
    return this.standardService.getPrivacyGrade(standard, ucStandard);
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

        if( !s[0].checked) {
          this.standardService.standardRemoved.next(s[0]);
        }
      }
    }
    this.getTotalGrade();
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
}
