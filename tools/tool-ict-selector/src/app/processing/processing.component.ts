import { Component, OnInit } from '@angular/core';
import ProcessingJson from '../../app/_files/processing.json'
import ConflictJson from '../../app/_files/conflicts.json'
import { MatTableDataSource } from '@angular/material/table'
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {

  datasource = new MatTableDataSource(ProcessingJson);
  displayedColumns : any[] = ['name', 'selected'];
  arguments: any[] = [];
  conflicts : any[] = [];
  exportService: ExportService;

  constructor(exportService: ExportService) {
    this.exportService = exportService;
    this.exportService.signalExport.subscribe( signal => 
      { 
        exportService.processingConditions = ProcessingJson.filter( (t:any) => 
        { 
          return t['selected']; 
        }); 
      });
  }


  ngOnInit(): void {
    ProcessingJson.forEach( (x:any) => 
      { 
        x['selected'] = false; 
        // x['conflict'] = false;
        Object.keys(x).forEach( (property:any) => {
          this.findArguments(x, property);
          this.processConflicts(x, property);
        });
      }
    )
  }

  private processConflicts(x: any, property: any) {
    if (property == 'conflicts') {
      let s = x['conflicts'][0];
      let foundConflict: any;
      ConflictJson.forEach(conflict => {
        if (conflict.name === s) {
          foundConflict = conflict;
        }
      }
      );
      if (foundConflict != null) {
        x[foundConflict.name] = true;
        if (this.conflicts.indexOf(foundConflict.name) === -1) {
          this.conflicts.push(foundConflict.name);
          this.displayedColumns.push(foundConflict.name);
        }
      }
    }
  }

  private findArguments(x: any, property: any) {
    if (typeof x[property] === 'string') {
      let s: string = x[property];
      if (s.indexOf('[') >= 0 && s.indexOf(']') > 0) {
        this.displayedColumns.push(property);
        this.arguments.push(property);
      }
    }
  }

  onSelect(event: Event, element: any) {
    let processingCondition: any = ProcessingJson.find( x => x.name == element.name );
    if (processingCondition != null) {
      processingCondition['selected'] = !processingCondition['selected'];
    }
  }

  onValueChanged(event: any, field: string, element: any) {
    let processingCondition: any = ProcessingJson.find( x => x.name == element.name );
    if (processingCondition != null) {
      processingCondition[field] = event.target.value;
    }
  }
}
