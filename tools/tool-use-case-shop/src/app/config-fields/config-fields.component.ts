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
  fieldsToShow: string[] = ['fieldList', 'csvSeperationToken', 'retentionPeriod', 'remark'];

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
        if( value.includes('[') || this.fieldsToShow.indexOf(key) >= 0 ) {
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
    this.data[target.id] = target.value;
    return true;
  }

  isSelection(value: string){
    if( value != null && value.indexOf(',') > 0 && value.startsWith('[')){
      return true;
    }
    return false;
  }

  getOptions(value: string){
    let t = value.replace("[","").replace("]","");
    let options = t.split(",");
    for( let i = 0; i < options.length; i++){
      options[i] = options[i].trim();      
    }
    return options;
  }

  getTitle(title: string){
    if (title.indexOf('url') >= 0 ){
      return "a valid URI, starting with http or https";
    }
    else if (title.indexOf('ISO8601') >= 0){
      return "Use 'NA' (not applicable) or a valid format, starting with a P, for example P1M (1 month), or in case of timespans, PT1H (1 hour)";
    }
    return title;
  }

  showOnly(field: any){
    if ( field.name === "fieldList") {
      return false;
    }
    return this.fieldsToShow.indexOf(field.name) >= 0 && field.title[0] != '[';
  }

  getDefaultValue(field: any){
    if (this.isSelection(field.title)) {
      return this.getOptions(field.title).splice(-1)[0];
    }
    if( field.title.indexOf( 'URL') > 0) {
      return "";
    }
    return (field.title as string).replace(',', ', ');
  }
}
