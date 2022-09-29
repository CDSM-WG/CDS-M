import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import AuthenticationJson from '../../app/_files/authentications.json'
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-config-authentication',
  templateUrl: './config-authentication.component.html',
  styleUrls: ['./config-authentication.component.css']
})
export class ConfigAuthenticationComponent implements OnInit, OnDestroy {

  @Input()
  data: any;

  dataSource: MatTableDataSource<any>;
  obs!: Observable<any>;

  constructor() { 
    this.dataSource = new MatTableDataSource<any>(AuthenticationJson);
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
  }

  setSelected(event: Event){
    let a: any = event.target;
    if( a.checked ){
      if( this.data.authentication == null ){
        this.data.authentication = [];  
      }
      this.data.authentication.push(this.getAuthentication(a.id));
    }
    else {
      let index = this.data.authentication.findIndex( (x:any) => x.name == a.id );
      this.data.authentication.splice(index, 1);
    }
  }

  getAuthentication(name: string){
    return AuthenticationJson.find( (x) => x.name == name );
  }

  getChecked(name: string) {
    return this.data.authentication != null && 
      this.data.authentication[name] != null;
  }

}
