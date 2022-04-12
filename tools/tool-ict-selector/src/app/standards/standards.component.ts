import { Component, ContentChild, HostListener, OnInit } from '@angular/core'
import StandardsJson from '../../app/_files/standards.json'
import UseCasesJson from '../../app/_files/use-cases.json'
import { MatTableDataSource } from '@angular/material/table'
import AuthenticationJson from '../../app/_files/authentications.json'
import { UseCaseService } from '../../services/use-case.service';

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})
export class StandardsComponent implements OnInit {

  static DISP_COLUMNS: any = ['name', 'selected', 'privacy', 'implE', 'reuse', 'interop', 'space'];
  static DISP_COLUMNS_AUTH: any = ['name'];

  displayedColumns : any[] = ['name', 'selected', 'privacy', 'implE', 'reuse', 'interop', 'space'];
  useCases : any[] = [];

  displayedColumnsAuthentication : any[] = ['name'];
  authentications : any[] = [];

  standards = StandardsJson;
  datasource = new MatTableDataSource(this.standards);
  datasourceAuthentication = new MatTableDataSource(this.standards);

  constructor(useCaseService : UseCaseService) {
    useCaseService.useCases.subscribe( (useCaseJson) => {
      this.init(useCaseJson);
    })
  }
  
  ngOnInit(): void {
    this.init(UseCasesJson);
  }

  init(useCaseJson : any) {
    if (useCaseJson == null) {
      return;
    }

    this.standards = StandardsJson;

    this.displayedColumns = Object.assign([], StandardsComponent.DISP_COLUMNS);
    this.useCases = [];
  
    this.displayedColumnsAuthentication = Object.assign([], StandardsComponent.DISP_COLUMNS_AUTH);
    this.authentications = [];  

    this.standards.forEach( (standard: any) => {
      useCaseJson.forEach( (useCase:any) => { 
            standard[ useCase.id ] = '';
            standard['selected'] = false;
          } );

      let exchangeType = standard.exchangeType;

      AuthenticationJson.forEach( (auth: any) => {
        auth.allowedExchangeTypes.forEach((element:any) => {
          if (element == exchangeType){
            standard[auth.name] = false;
          }
        });
      } )
    })

    useCaseJson.forEach( (useCase : any) =>  
      useCase.standards?.forEach( (s:any) => {
        const standard : any = this.standards.find( x => x.name == s );
        if ( standard != undefined ) {
          standard[ useCase.id ] = 'X';
          if( this.useCases.find(x => x == useCase.id) == undefined) {
            this.useCases.push(useCase.id);
          } 
        } 
      } )
    )

    this.displayedColumns = this.displayedColumns.concat(this.useCases)

    AuthenticationJson.forEach( (auth: any) => {
      this.authentications.push(auth.name);
      if (!(auth.name in this.displayedColumnsAuthentication)) {
        this.displayedColumnsAuthentication.push(auth.name);
      }
    } )

    let usedStandards = this.standards.filter( (standard: any) => {
      let items = this.useCases.filter( (usecase: any) => {
        return standard[usecase] != '';
      })
      return items.length > 0;
    })
    this.standards = usedStandards;

    this.datasource = new MatTableDataSource(this.standards);
    this.datasourceAuthentication = new MatTableDataSource(this.standards);  

    this.datasource.filterPredicate = function(data: any, filter: string): boolean {
      return data[filter] != '' || data['selected'] === true;
    };

    this.datasourceAuthentication.filterPredicate = function(data: any, filter: string): boolean {
      return data['selected'] == true;
    };

    this.datasourceAuthentication.filter = 'true';
  }

  @HostListener('matSortChange', ['$event'])
  sortChange(e: Event) {
    console.log(e);
  }

  onSelect(e: Event, element: any) {
    console.log(e);
    this.standards.forEach( (s:any) => {
      if (s.name === element.name) {
        s.selected = !element.selected;
      }
    })
    this.datasourceAuthentication.filter = 'true';
  }

  filterColumn(e: Event) {
    let filter = ''
    if (e.currentTarget != null) {
      let span = e.currentTarget as HTMLSpanElement;
      filter = span.innerText;
    }
  
    if (this.datasource.filter != filter) {
      this.datasource.filter = filter;
    }
    else {
      this.datasource.filter = '';
    }
  }
}
