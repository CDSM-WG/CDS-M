import { Component, ContentChild, HostListener, OnInit } from '@angular/core'
import StandardsJson from '../../app/_files/standards.json'
import ConflictJson from '../../app/_files/conflicts.json'
import UseCasesJson from '../../app/_files/use-cases.json'
import { MatTableDataSource } from '@angular/material/table'
import AuthenticationJson from '../../app/_files/authentications.json'
import { UseCaseService } from '../../services/use-case.service'
import { ExportService } from 'src/services/export.service'

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})
export class StandardsComponent implements OnInit {

  static DISP_COLUMNS: any = ['name', 'selected', 'conflict', 'sortValue', 'privacy', 'space'];
  static DISP_COLUMNS_AUTH: any = ['name'];

  displayedColumns : any[] = ['name', 'selected', 'conflict', 'sortValue', 'privacy', 'implE', 'reuse', 'interop', 'domain', 'space'];
  useCases : any[] = [];

  displayedColumnsAuthentication : any[] = ['name'];
  authentications : any[] = [];

  displayedColumnsAttributes : any[] = ['name'];
  attributes : any[] = [];

  standards = StandardsJson;
  datasource = new MatTableDataSource(this.standards);
  datasourceAuthentication = new MatTableDataSource(this.standards);
  datasourceAttributes = new MatTableDataSource(this.standards);

  useCasesToExport = UseCasesJson;

  useAllUseCases: boolean = true;
  privacyOnly: boolean = true;

  conflicts = ConflictJson;

  privacyWeight = 10;
  costsWeight = 1;
  reusabilityWeight = 1;
  interoperabilityWeight = 1;
  domainWeight = 1;

  constructor(useCaseService : UseCaseService, exportService: ExportService) {
    useCaseService.useCases.subscribe( (useCaseJson) => {
      if ( useCaseJson != null ) {
        this.init(useCaseJson);
      }
    });
    exportService.signalExport.subscribe( signal => {
      if (signal === "export") {
        exportService.useCases = this.useCasesToExport;
        exportService.standards = this.standards;
        exportService.authentications = this.authentications;
        exportService.attributes = this.displayedColumnsAttributes;
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

    this.useAllUseCases = true;
    this.privacyOnly = true;

    this.useCasesToExport = useCaseJson;
    this.standards = StandardsJson;

    this.displayedColumns = Object.assign([], StandardsComponent.DISP_COLUMNS);
    this.useCases = [];
  
    this.displayedColumnsAuthentication = Object.assign([], StandardsComponent.DISP_COLUMNS_AUTH);
    this.authentications = [];  

    this.configureUseCases();
    this.collectUseCaseColumns();
    this.collectAuthenticationColumns();
    this.collectAttributeColumns();
    this.filterUsedStandards();
    this.configureStandardsDataSource();
    this.configureAuthenticationDataSource();
    this.configureAttributeDataSource();

    this.standards = this.sortDataSource(this.standards);

    this.datasource.filterPredicate =
      (data: any, filter: string) => {
        let checked = filter==="true";
        if (checked) {
          return this.allUseCasesChecked(data);
        }
        return true;
      }
    this.datasource.filter = "true";
  }

  private configureUseCases() {
    this.standards.forEach((standard: any) => {
      this.useCasesToExport.forEach((useCase: any) => {
        standard[useCase.id] = ''
        standard['selected'] = false
        standard['conflict'] = false
        if ('conflicts' in standard) {
          standard['conflict'] = true
        }
      })

      let exchangeType = standard.exchangeType

      AuthenticationJson.forEach((auth: any) => {
        auth.allowedExchangeTypes.forEach((element: any) => {
          if (exchangeType.indexOf(element) >= 0) {
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

        if( 'mark' in s ) {
          standard[useCase.id] = s['mark']  
        }

        if ( 'privacy' in standard && standard['privacy']  === '*') {
          standard[useCase.id] = '+'
        }

        if ( 'explanation' in s ) {
          standard[useCase.id + '_expl'] = s['explanation']
        }

        if ('dataProtection' in s) {
          let defaultPrivacy = standard['privacy']
          if (this.less(s['dataProtection'], defaultPrivacy)) {
            standard['privacy'] = s['dataProtection']
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

  getExplanation(label: string, element: any){
    if (label + '_expl' in element){
      return element[label + '_expl'];
    }
    return '';
  }

  private collectAuthenticationColumns() {
    AuthenticationJson.forEach((auth: any) => {
      this.authentications.push(auth.name)
      if (!(auth.name in this.displayedColumnsAuthentication)) {
        this.displayedColumnsAuthentication.push(auth.name)
      }
    })
  }

  private collectAttributeColumns() {
    this.standards.forEach((s: any) => {
      
      Object.keys(s).forEach( (property: string) => {
        if (!property.startsWith("org_")) {
          let value = s[property];
          if ( typeof value === 'string' ) {
            if (value.indexOf('[') >= 0 ){
              if (this.attributes.indexOf(property) === -1) {
                this.attributes.push(property);
              }
              if (this.displayedColumnsAttributes.indexOf(property) === -1) {
                this.displayedColumnsAttributes.push(property);
              }
            }
          }
        }
      })
    })
  }

  getVisibilityClass(value: any, column: string, element: any){
    if ('org_' + column in element) return 'visible';
    if( value == null ) return 'invisible';
    if( typeof value === 'string' && value.indexOf('[') == -1) return 'invisible';
    return 'visible';
  }

  private filterUsedStandards() {
    let usedStandards = this.standards.filter((standard: any) => {
      let items = this.useCases.filter((usecase: any) => {
        return standard[usecase] != '';
      })
      return items.length > 0;
    })
    this.standards = usedStandards
  }

  private configureStandardsDataSource() {
    this.datasource = new MatTableDataSource(this.standards);

    this.datasource.filterPredicate = function (data: any, filter: string): boolean {
      return data[filter] != '' || data['selected'] === true;
    }
  }

  private configureAuthenticationDataSource() {
    this.datasourceAuthentication = new MatTableDataSource(this.standards);  
    this.datasourceAuthentication.filterPredicate = function(data: any, filter: string): boolean {
      return data['selected'] == true;
    };
    this.datasourceAuthentication.filter = 'true';
  }

  private configureAttributeDataSource() {
    this.datasourceAttributes = new MatTableDataSource(this.standards);  
    this.datasourceAttributes.filterPredicate = function(data: any, filter: string): boolean {
      return data['selected'] == true;
    };
    this.datasourceAttributes.filter = 'true';
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
    let score = this.privacyWeight * this.getFieldValue(a,'privacy');

    if (!this.privacyOnly) {
      score = score 
      + this.costsWeight * this.getFieldValue(a,'implementationEffort')
      + this.reusabilityWeight * this.getFieldValue(a,'reusability')
      + this.interoperabilityWeight * this.getFieldValue(a,'interoperability')
      + this.domainWeight * this.getFieldValue(a,'domain');
    }

    if (a['interoperability'] != 'E' && a['interoperability'] != 'D') {
      this.useCases.forEach( u => {
        if (u in a) {
          if ( a[u] != '' ) {
            score = score + 2;
          }
        }
      } );
    }

    a['sortValue'] = score;
    return score;
  }

  private getFieldValue(a: any, field: string) {
    if (field in a) {
      let value = a[field];
      let charValue = 70 - a[field].charCodeAt(0);
      if ('ABCDE'.indexOf(value) === -1) {
        charValue = 0;
      }
      return charValue;
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
    this.datasourceAttributes.filter = 'true';
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
    let result = '';
    this.useCasesToExport.forEach( x => { if ( x.id === category ) 
      { 
        result = 'As a ' + x.story.asA + '\nI would like to ' + x.story.iWouldLikeTo + '\nin order to ' + x.story.inOrderTo; 
      } 
    } );

    this.standards.forEach( s => { 
      if (s.name === category && ('description' in s)) { 
        result = String(s['description']); 
      } } );

    if (category === "retentionPeriod") {
      result = "How long the data can be stored;\n ISO 8601 Duration, see https://en.wikipedia.org/wiki/ISO_8601#Durations";
    } else if (category === "refreshRate" ) {
      result = "How often this data source is refreshed;\n ISO 8601 Duration, see https://en.wikipedia.org/wiki/ISO_8601#Durations";
    } else if (category === "exchangeType" ) {
      result = "What type of exchange this is (some interfaces can have multiple appearances).\nPossible values: API, file exchange";
    }

    return result;
  }

  formatColumnName(name: string){
    var output:String = "";
    var len:number = name.length;
    var char:string;

    for (var i: number = 0; i<len;i++) {
        char = name.charAt(i);

        if (i==0) {
            output = output.concat(char.toUpperCase());
        }
        else if (char !== char.toLowerCase() && char === char.toUpperCase()) {
            output = output.concat(" ",  char.toLowerCase());
        }
        else if (char == "-" || char == "_") {
            output = output.concat(" ");
        }
        else {
            output = output.concat(char);
        }
    }

    return output;
  }

  onAttributeChanged(event: any, field: string, element: any) {
    let standard: any = this.standards.find( x => x.name == element.name );
    if (standard != null) {
      standard['org_' + field] = standard[field];
      standard[field] = event.target.value;
    }
  }

  onChangeAllUsecases(event: any) {
    this.useAllUseCases = event.target.checked;
    this.datasource.filter = String(this.useAllUseCases);
    this.standards = this.sortDataSource(this.standards);
  }

  onChangePrivacyOnly(event: any) {
    this.privacyOnly = event.target.checked;
    if( this.privacyOnly ) {
      this.removeColumn('implE');
      this.removeColumn('reuse');
      this.removeColumn('interop');
      this.removeColumn('domain');
    }
    else {
      this.displayedColumns.splice(5, 0, 'domain');
      this.displayedColumns.splice(5, 0, 'interop');
      this.displayedColumns.splice(5, 0, 'reuse');
      this.displayedColumns.splice(5, 0, 'implE');
    }
    this.standards = this.sortDataSource(this.standards);
  }

  removeColumn(columnId: string){
    let index = this.displayedColumns.indexOf(columnId);
    if ( index >= 0 ) {
      this.displayedColumns.splice(index, 1);
    }
  }

  allUseCasesChecked(data: any): boolean {
    let allFound = true;
    this.useCases.forEach( s => 
      {
        if (!data['selected']) {
          if ( s in data ){
            if ( data[s] == '' ){
              allFound = false;
            }
          }
          else {
            allFound = false;
          }
        }
      });
    return allFound;
  }

  getConflictDescription(data: any) {
    let description = "";
    if (data.conflict) {
      this.conflicts.forEach( (c) => {
          if( data.conflicts.indexOf(c.name) === 0 ){
            description = description + "Conflict: " + c.reason + 
              "\nMitigation using agreements: " + this.formatMitigation(c.agreements) +
              "\nMitigation using authentication: " + this.formatMitigation(c.authenticationMethods) +
              "\nMitigation using transport conditions: " + this.formatMitigation(c.transportConditions) +
              "\n* = Required";
          }
        }
      );
    };
    return description;
  }

  formatMitigation(mitigationActions: any) {
    let foundRequiredOnes = false;
    let result = "\n";

    mitigationActions.forEach( (m: any) => {
      let r = (('isRequired' in m && m.isRequired)?"*":"");
      result = result + " - " + m.buildingBlock + r + "\n";
      if ( r != "") {
        foundRequiredOnes = true;
      }
    });

    if( !foundRequiredOnes ) {
      result = "\n(at least one of these)" + result;
    }
    return result;
  }

  privacyChanged(event: Event){
    if (event.currentTarget != null){
      let input = event.currentTarget as HTMLInputElement;
      this.privacyWeight = Number(input.value);
      this.standards = this.sortDataSource(this.standards);
      this.datasource.data = this.standards;
    }
  }
  costsChanged(event: Event){
    if (event.currentTarget != null){
      let input = event.currentTarget as HTMLInputElement;
      this.costsWeight = Number(input.value);
      this.standards = this.sortDataSource(this.standards);
      this.datasource.data = this.standards;
    }
  }
  reusabilityChanged(event: Event){
    if (event.currentTarget != null){
      let input = event.currentTarget as HTMLInputElement;
      this.reusabilityWeight = Number(input.value);
      this.standards = this.sortDataSource(this.standards);
      this.datasource.data = this.standards;
    }
  }
  interoperabilityChanged(event: Event){
    if (event.currentTarget != null){
      let input = event.currentTarget as HTMLInputElement;
      this.interoperabilityWeight = Number(input.value);
      this.standards = this.sortDataSource(this.standards);
      this.datasource.data = this.standards;
    }
  }
  domainChanged(event: Event){
    if (event.currentTarget != null){
      let input = event.currentTarget as HTMLInputElement;
      this.domainWeight = Number(input.value);
      this.standards = this.sortDataSource(this.standards);
      this.datasource.data = this.standards;
    }
  }
  addStandardRow(element: any, column: string){
    let clone: any = JSON.parse(JSON.stringify(element));
    clone['name'] = clone['name'] + '-' + column;
    clone['selected'] = true;

    Object.keys(clone).forEach( (property: any) => {
      if ( clone[property] === '+' ) {
        clone[property] = '';
      }
      if (property === column) {
        clone[property] = 'X';
      }
    })

    clone['domain'] = 'A';
    clone['privacy'] = '[?]';

    this.standards.push(clone);
    this.standards = this.sortDataSource(this.standards);
    this.datasource.data = this.standards;
    this.datasourceAuthentication.filter = 'true';
    this.datasourceAttributes.filter = 'true';
    this.collectAttributeColumns();
  }

}

