import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UseCaseService } from 'src/services/use-case.service';

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
  ucShown: boolean = false;

  constructor(private usecaseService: UseCaseService) {
    this.dataSource = new MatTableDataSource<any>(this.useCases);
  }

  ngOnInit(): void {    
    for( let i = 0; i < this.usecaseService.useCaseList.length; i++ ){
      let uc:any = this.usecaseService.useCaseList[i];
      if ( i== 0 ) {
        this.selectedUseCase = uc;
      }

      if( uc.standards != null ) {
        for ( let j = 0; j < uc.standards.length; j++ ) {
          if ( uc.standards[j].name === this.data.name ) {
            let name = String(uc.id);
            this.useCases.push(name);
          }
        }
      }
    }

    this.obs = this.dataSource.connect();
  }

  show(useCase:string) {
    this.selectedUseCase = this.usecaseService.getUseCase(useCase);
    this.ucShown = true;
  }
}
