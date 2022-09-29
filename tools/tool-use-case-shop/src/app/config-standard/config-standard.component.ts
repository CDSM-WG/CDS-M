import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactory, OnChanges } from '@angular/core';
import { ConfigAuthenticationComponent } from '../config-authentication/config-authentication.component';
import { ConfigFieldsComponent } from '../config-fields/config-fields.component';

@Component({
  selector: 'app-config-standard',
  templateUrl: './config-standard.component.html',
  styleUrls: ['./config-standard.component.css']
})
export class ConfigStandardComponent implements OnInit, OnChanges {

  @Input()
  data: any;

  @ViewChild('stepContainer', {read: ViewContainerRef}) 
  container!: ViewContainerRef;

  step: number = 0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
  }

  ngOnInit(): void {
    this.determineStep();
    this.fillComponent();  
  }

  ngOnChanges() {
  }

  fillComponent() {
    if( this.step == 1 ){
      this.container.clear();
      this.data.step = 1;
    } else if (this.step == 2 ){
      this.container.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfigAuthenticationComponent);
      const ref = this.container.createComponent(componentFactory);
      ref?.instance.setData(this.data);
      this.data.step = 2;
    } else if (this.step == 3){
      this.container.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfigFieldsComponent);
      const ref = this.container.createComponent(componentFactory);
      ref?.instance.setData(this.data);
      this.data.step = 3;
    } else if( this.step > 3 ){
      this.container.clear();
      this.data.step = 4;
    }
  }

  determineStep() {
    if (this.data.authentications != null) {
      this.step = 2;
    }
    else {
      return;
    }
    let unspecifiedValueFound = false;
    for( let key of Object.keys(this.data) ) {
      let value = this.data[key];
      if (typeof value === 'string' || value instanceof String) {
        if( !value.includes('[')) {
          unspecifiedValueFound = true;
          break;
        }
      }
    }
    if (!unspecifiedValueFound) {
      this.step = 3;
    }
  }
  
  next() {
    if ( this.step == 0 ){
      this.step = 1;
    }
    this.step = this.step + 1;
    this.fillComponent();
  }

  setStep(i:number){
    this.step = i;
    this.fillComponent();
  }

}
