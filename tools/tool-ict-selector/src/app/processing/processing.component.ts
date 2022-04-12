import { Component, OnInit } from '@angular/core';
import ProcessingJson from '../../app/_files/processing.json'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {

  datasource = new MatTableDataSource(ProcessingJson)
  displayedColumns : any[] = ['name', 'selected']
  arguments: any[] = []

  constructor() { }

  ngOnInit(): void {
    ProcessingJson.forEach( (x:any) => 
      { 
        x['selected'] = false; 
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
  }

}
