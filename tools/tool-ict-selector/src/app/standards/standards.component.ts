import { Component, ContentChild, HostListener, OnInit } from '@angular/core'
import StandardsJson from '../../app/_files/standards.json'
import UseCasesJson from '../../app/_files/use-cases.json'
import { MatTableDataSource } from '@angular/material/table'
import AuthenticationJson from '../../app/_files/authentications.json'
import { UseCaseService } from '../../services/use-case.service';
import { ExportService } from 'src/services/export.service'
import { MatSort } from '@angular/material/sort'

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})
export class StandardsComponent implements OnInit {

  static DISP_COLUMNS: any = ['name', 'selected', 'sortValue', 'privacy', 'implE', 'reuse', 'interop', 'domain', 'space'];
  static DISP_COLUMNS_AUTH: any = ['name'];

  displayedColumns : any[] = ['name', 'selected', 'sortValue', 'privacy', 'implE', 'reuse', 'interop', 'domain', 'space'];
  useCases : any[] = [];

  displayedColumnsAuthentication : any[] = ['name'];
  authentications : any[] = [];

  standards = StandardsJson;
  datasource = new MatTableDataSource(this.standards);
  datasourceAuthentication = new MatTableDataSource(this.standards);

  useCasesToExport = UseCasesJson;

  constructor(useCaseService : UseCaseService, exportService: ExportService) {
    useCaseService.useCases.subscribe( (useCaseJson) => {
      this.init(useCaseJson);
    });
    exportService.signalExport.subscribe( signal => {
      if (signal === "export") {
        exportService.useCases = this.useCasesToExport;
        exportService.standards = this.standards;
        exportService.authentications = this.authentications;
      }
    });
  }
  
  ngOnInit(): void {
    this.init(UseCasesJson);
  }

  init(useCaseJson : any) {
    if (useCaseJson == null) {
      return;
    }

    this.useCasesToExport = useCaseJson;
    this.standards = StandardsJson;

    this.displayedColumns = Object.assign([], StandardsComponent.DISP_COLUMNS);
    this.useCases = [];
  
    this.displayedColumnsAuthentication = Object.assign([], StandardsComponent.DISP_COLUMNS_AUTH);
    this.authentications = [];  

    this.configureUseCases();
    this.collectUseCaseColumns();
    this.collectAuthenticationColumns();
    this.filterUsedStandards();
    this.configureStandardsDataSource();
    this.configureAuthenticationDataSource();

    this.standards = this.sortDataSource(this.standards);
  }

  private configureUseCases() {
    this.standards.forEach((standard: any) => {
      this.useCasesToExport.forEach((useCase: any) => {
        standard[useCase.id] = ''
        standard['selected'] = false
      })

      let exchangeType = standard.exchangeType

      AuthenticationJson.forEach((auth: any) => {
        auth.allowedExchangeTypes.forEach((element: any) => {
          if (element == exchangeType) {
            standard[auth.name] = false
          }
        })
      })
    })
  }

  private collectUseCaseColumns() {
    this.useCasesToExport.forEach((useCase: any) => useCase.standards?.forEach((s: any) => {
      const standard: any = this.standards.find(x => x.name == s.name)
      if (standard != undefined) {
        standard[useCase.id] = 'X'

        if ('privacy' in s) {
          let defaultPrivacy = standard['privacy']
          if (this.less(s['privacy'], defaultPrivacy)) {
            standard['privacy'] = s['privacy']
          }
        }

        if (this.useCases.find(x => x == useCase.id) == undefined) {
          this.useCases.push(useCase.id)
        }
      }
    })
    )

    this.displayedColumns = this.displayedColumns.concat(this.useCases)
  }

  private collectAuthenticationColumns() {
    AuthenticationJson.forEach((auth: any) => {
      this.authentications.push(auth.name)
      if (!(auth.name in this.displayedColumnsAuthentication)) {
        this.displayedColumnsAuthentication.push(auth.name)
      }
    })
  }

  private filterUsedStandards() {
    let usedStandards = this.standards.filter((standard: any) => {
      let items = this.useCases.filter((usecase: any) => {
        return standard[usecase] != ''
      })
      return items.length > 0
    })
    this.standards = usedStandards
  }

  private configureStandardsDataSource() {
    this.datasource = new MatTableDataSource(this.standards)

    this.datasource.filterPredicate = function (data: any, filter: string): boolean {
      return data[filter] != '' || data['selected'] === true
    }
  }

  private configureAuthenticationDataSource() {
    this.datasourceAuthentication = new MatTableDataSource(this.standards);  
    this.datasourceAuthentication.filterPredicate = function(data: any, filter: string): boolean {
      return data['selected'] == true;
    };
    this.datasourceAuthentication.filter = 'true';
  }

  private sortDataSource(source: any[]) {
    return source.sort((a: any, b: any) => {
      let aCount = this.evaluateStandard(a);
      let bCount = this.evaluateStandard(b);
      
      if (aCount < bCount) {
          return 1;
      } else if (aCount > bCount) {
          return -1;
      } else {
          return 0;
      }
    });
  }

  private evaluateStandard(a: any) {
    let score = this.getFieldValue(a,'privacy')
      + this.getFieldValue(a,'implementationEffort')
      + this.getFieldValue(a,'reusability')
      + this.getFieldValue(a,'interoperability')
      + this.getFieldValue(a,'domain');

    this.useCases.forEach( u => {
      if (u in a) {
        if ( a[u] != '' ) {
          score = score + 10;
        }
      }
    } );

    a['sortValue'] = score;
    return score;
  }

  private getFieldValue(a: any, field: string) {
    if (field in a) {
      return 70 - a[field].charCodeAt(0);
    }
    return 0;
  }

  @HostListener('matSortChange', ['$event'])
  sortChange(e: Event) {
    console.log(e);
  }

  less(gradeA : string, gradeB : string) {
    return gradeA.charCodeAt(0) < gradeB.charCodeAt(0);
  }

  onSelectAuthentication(e: any, element: any) {
    if (e.currentTarget != null) {
      let id = e.currentTarget['id'];
      element[id] = !element[id];
    }
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

  getTitle(category: string){
    switch(category){
      case 'privacy': return 'A	Non-personal data\n' +
        'B	Personal data, but complies with purpose limitation & data minimalization\n' +
        'C	Unnecessary personal data\n' +
        'D	Personal data and not fully compliant\n' +
        'E	A surplus of personal data';
      case 'implementation': return 'Implementation + maintainance costs\n' +
        'A	distribute direct exports from production systems, offline\n' +
        'B	generated, structured data, offline\n' +
        'C	generated, complex structured data, offline\n' +
        'D	generated, business oriented data, realtime exchange\n' +
        'E	generated, complex structured data, hard to read & interpret, realtime exchange';      
      case 'reuse': return 'A	Is used in other domains / interfaces\n' +
        'B	Can be used in other domains / interfaces\n' +
        'C	-\n' +
        'D	Not likely to be used in other domains / interfaces\n' +
        'E	Has to be implemented for this purpose only';
      case 'interop': return 'A	Is a well known, worldwide standard\n' +
        'B	Is a well known standard\n' +
        'C	Is a regional or national standard\n' +
        'D	Is a misused standard\n' +
        'E	Tailor made';
      case 'domain': return 'A	Tailered to the data exchange purpose\n' +
        'B	Tailered to the mobility domain\n' +
        'C	-\n' +
        'D	Generic domain\n' +
        'E	Completely generic';
    }
    return '';
  }
}
