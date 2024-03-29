import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UseCaseService } from 'src/services/use-case.service';
import { StandardService } from '../../services/standard.service';

@Component({
  selector: 'app-standard-ticket',
  templateUrl: './standard-ticket.component.html',
  styleUrls: ['./standard-ticket.component.css']
})
export class StandardTicketComponent implements OnInit {

  @Input()
  data: any;

  obs!: Observable<any>;
  dataSource: MatTableDataSource<any>;
  useCases: string[] = []
  selectedUseCase: any;
  
  collapsed: boolean = true;

  constructor(private usecaseService: UseCaseService, private standardService: StandardService) {
    this.dataSource = new MatTableDataSource<any>(this.useCases);
  }

  ngOnInit(): void {
    for (let i = 0; i < this.usecaseService.useCaseList.length; i++) {
      let uc: any = this.usecaseService.useCaseList[i];
      if (i == 0) {
        this.selectedUseCase = uc;
      }

      if (uc.standards != null) {
        for (let j = 0; j < uc.standards.length; j++) {
          if (uc.standards[j].name === this.data.name) {
            let name = String(uc.id);
            if ( this.useCases.indexOf(name) == -1 ) {
              this.useCases.push(name);
            }
          }
        }
      }
    }

    this.obs = this.dataSource.connect();
  }

  show(useCase: string) {
    this.selectedUseCase = this.usecaseService.getUseCase(useCase);
  }

  getDetails(useCase: string) {
    let uc = this.usecaseService.getUseCase(useCase);
    return "As a " + uc.story.asA + " I would like to " + uc.story.iWouldLikeTo + " in order to " + uc.story.inOrderTo;
  }

  isChecked(standard: any) {
    for (let i = 0; i < this.usecaseService.useCaseList.length; i++) {
      let uc = this.usecaseService.useCaseList[i];
      if (uc.standards != null) {
        for (let j = 0; j < uc.standards.length; j++) {
          if (standard.name === uc.standards[j].name && uc.standards[j].checked) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkChanged(event: any, standard: any){
    for (let i = 0; i < this.usecaseService.useCaseList.length; i++) {
      let uc = this.usecaseService.useCaseList[i];
      if (uc.standards != null) {
        for (let j = 0; j < uc.standards.length; j++) {
          if (standard.name === uc.standards[j].name) {
            uc.standards[j].checked = event.target.checked;
          }
        }
      }
    }
    if(event.target.checked){
      this.standardService.selectStandard(standard);
    }
    else {
      this.standardService.deselectStandard(standard);
    }
}

  isCollapsed () {
    return this.collapsed;
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
