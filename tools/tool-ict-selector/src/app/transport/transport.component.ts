import { Component, OnInit } from '@angular/core';
import TransportJson from '../../app/_files/transport.json'
import { MatTableDataSource } from '@angular/material/table'
import ConflictJson from '../../app/_files/conflicts.json'

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  datasource = new MatTableDataSource(TransportJson)
  displayedColumns : any[] = ['name', 'selected']
  conflicts : any[] = []

  constructor() { }

  ngOnInit(): void {
    TransportJson.forEach( (x:any) => 
      { 
        x['selected'] = false;
        x['conflict'] = false;

        Object.keys(x).forEach( (property:any) => {
          if (property == 'conflicts') {
            let s = x['conflicts'][0];
            let foundConflict;
            ConflictJson.forEach( conflict => 
              { 
                if (conflict.name === s) 
                { 
                  foundConflict = conflict;
                } 
              } 
            )
            if (foundConflict != null ){
              x['conflictReason'] = JSON.stringify(foundConflict, null, 2).replace(',', ',\n');                                             
              x['conflict'] = true;
            }
          }
        })
      }
    )
    this.conflicts.push('conflict')
    this.displayedColumns.push('conflict')
  }

}
