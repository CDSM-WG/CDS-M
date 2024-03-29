import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactory, OnChanges, ComponentRef } from '@angular/core';
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
  ref! : ComponentRef<any>;

  step: number = 1;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
  }

  ngOnInit(): void {
    this.determineStep();
    this.fillComponent();
  }

  ngOnChanges() {
  }

  fillComponent() {
    if( this.container == null ) {
      setTimeout(() => {this.fillComponent()}, 400);
      return;
    }

    if( this.step == 1 ){
      if( this.container != null ){
        this.container.clear();
      
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfigAuthenticationComponent);
        this.ref = this.container.createComponent(componentFactory);
        this.ref.instance.setData(this.data);
      }
      this.data.step = 1;
    } else if (this.step == 2){
      if( this.container != null ){
        this.container.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfigFieldsComponent);
        this.ref = this.container.createComponent(componentFactory);
        this.ref.instance.setData(this.data);
      }
      this.data.step = 2;
    } else if( this.step > 2 ){
      if( this.container != null ){
        this.container.clear();
      }
      this.data.step = 3;
    }
  }

  isBlocked() {
    if (this.step == 1) {
      return false;
    }
    if (this.ref == null ) {
      return false;
    }
    return this.ref.instance.isBlocked();
  }

  determineStep() {
    if (this.data.authentications != null) {
      this.step = 1;
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
      this.step = 2;
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
