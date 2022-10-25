import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-config-fields',
  templateUrl: './config-fields.component.html',
  styleUrls: ['./config-fields.component.css']
})
export class ConfigFieldsComponent implements OnInit {

  @Input()
  data: any;

  dataSource: MatTableDataSource<any>;
  obs!: Observable<any>;
  fields: any[] = [];

  constructor() { 
    this.dataSource = new MatTableDataSource<any>(this.fields);
  }

  ngOnInit(): void {
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  
  setData(data: any){
    this.data = data;

    for( let key of Object.keys(this.data) ) {
      let value = this.data[key];
      if (typeof value === 'string' || value instanceof String) {
        if( value.includes('[')) {
          this.fields.push({ name: key, value: "", title: value });
        }
      }
    }
  }

  isBlocked(){
    for (let i = 0; i < this.fields.length; ++i) {
      let kv: any = this.fields[i];
      if (kv.value === ""){
        return true;
      }
    }
    return false;
  }

  setValue(event: Event){
    let target: any = event.target;
    let entry = this.fields.find( (x) => x.name == target.id);
    entry.value = target.value;
    this.data[target.id] = target.value;
  }

  isSelection(value: string){
    if( value.indexOf(',') > 0 ){
      return true;
    }
    return false;
  }

  getOptions(value: string){
    let t = value.replace("[","").replace("]","");
    let options = t.split(",");
    return options;
  }

}
