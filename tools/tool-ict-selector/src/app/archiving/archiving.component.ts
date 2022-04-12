import { Component, OnInit } from '@angular/core';
import ArchivingJson from '../../app/_files/archiving.json'
import ConflictJson from '../../app/_files/conflicts.json'
import { MatTableDataSource } from '@angular/material/table'

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

  constructor() { }

  ngOnInit(): void {
    ArchivingJson.forEach( (x:any) => 
      { 
        x['selected'] = false;
        x['conflict'] = false;

        Object.keys(x).forEach( (property:any) => {
          if (property == 'conflicts') {
            let s = x['conflicts'][0];
            let foundConflict = null;
            ConflictJson.forEach( conflict => 
              { 
                if (conflict.name === s) 
                { 
                  foundConflict = conflict;
                } 
              } 
            )
            if (foundConflict != null ){
              if( !('conflictReason' in x)) {
                // x['conflictReason'] = JSON.stringify(foundConflict, null, 2).replace(',', ',\n');                                             
              }
              x['conflict'] = true;              
            }
          }
        })

        Object.keys(x).forEach( (property:any) => {
          if (typeof x[property] === 'string') {
            let s: string = x[property]
            if (s.indexOf('[') >= 0 && s.indexOf(']') > 0) {
              this.displayedColumns.push(property)
              this.arguments.push(property)
            }
          }
        })
      }
    )  
    if (!('conflict' in this.displayedColumns)){
      this.displayedColumns.push('conflict');
    }
    this.conflicts.push('conflict');
  }
}
