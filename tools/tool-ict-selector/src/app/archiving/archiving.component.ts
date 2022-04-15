import { Component, OnInit } from '@angular/core';
import ArchivingJson from '../../app/_files/archiving.json'
import ConflictJson from '../../app/_files/conflicts.json'
import { MatTableDataSource } from '@angular/material/table'
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-archiving',
  templateUrl: './archiving.component.html',
  styleUrls: ['./archiving.component.css']
})
export class ArchivingComponent implements OnInit {

  datasource = new MatTableDataSource(ArchivingJson)
  displayedColumns : any[] = ['name', 'selected']
  arguments: any[] = []
  conflicts : any[] = []
  exportService: ExportService;

  constructor(exportService: ExportService) {
    this.exportService = exportService;
    this.exportService.signalExport.subscribe( signal => 
      { 
        exportService.archivingConditions = ArchivingJson.filter( (t:any) => 
        { 
          return t['selected']; 
        }); 
      });
  }

  ngOnInit(): void {
    ArchivingJson.forEach( (x:any) => 
      { 
        x['selected'] = false; 
        Object.keys(x).forEach( (property:any) => {
          this.processConflicts(x, property);
          this.findArguments(x, property);
        });    
      }
    )  
    this.displayedColumns = this.displayedColumns.concat(this.conflicts);   
    this.displayedColumns = this.displayedColumns.concat(this.arguments);
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
        }
      }
    }
  }

  private findArguments(x: any, property: any) {
    if (typeof x[property] === 'string') {
      let s: string = x[property];
      if (s.indexOf('[') >= 0 && s.indexOf(']') > 0) {
        this.arguments.push(property);
      }
    }
  }

  onSelect(event: Event, element: any) {
    let archivingCondition: any = ArchivingJson.find( x => x.name == element.name );
    if (archivingCondition != null) {
      archivingCondition['selected'] = !archivingCondition['selected'];
    }
  }

  onValueChanged(event: any, field: string, element: any) {
    let archivingCondition: any = ArchivingJson.find( x => x.name == element.name );
    if (archivingCondition != null) {
      archivingCondition[field] = event.target.value;
    }
  }
}
