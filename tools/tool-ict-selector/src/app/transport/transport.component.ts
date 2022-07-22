import { Component, OnInit } from '@angular/core';
import TransportJson from '../../app/_files/transport.json'
import { MatTableDataSource } from '@angular/material/table'
import ConflictJson from '../../app/_files/conflicts.json'
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  datasource = new MatTableDataSource(TransportJson)
  displayedColumns : any[] = ['name', 'selected']
  conflicts : any[] = []
  exportService: ExportService;

  constructor(exportService: ExportService) {
    this.exportService = exportService;
    this.exportService.signalExport.subscribe( signal => 
      { 
        exportService.transportConditions = TransportJson.filter( (t:any) => 
        { 
          return t['selected']; 
        }); 
      } );
  }

  ngOnInit(): void {
    TransportJson.forEach( (x:any) => 
      { 
        x['selected'] = false;
        x['conflict'] = false;
        this.processConflicts(x);
      }
    )
  }

  private processConflicts(x: any) {
    Object.keys(x).forEach((property: any) => {
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
            // x['conflictReason'] = JSON.stringify(foundConflict, null, 2).replace(',', ',\n');
            this.conflicts.push(foundConflict.name);
            this.displayedColumns.push(foundConflict.name);
          }
        }
      }
    });
  }

  onSelect(event: Event, element: any) {
    let transportCondition: any = TransportJson.find( x => x.name == element.name );
    if (transportCondition != null) {
      transportCondition['selected'] = !transportCondition['selected'];
    }
  }
}
