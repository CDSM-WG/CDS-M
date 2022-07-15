import { Injectable } from '@angular/core';
import * as data from '../app/_files/standards.json';

@Injectable()
export class StandardService {
  getPrivacyGrace(standard: string) {
    let s = this.getStandard(standard);
    return s.privacy;
  }  

  standardList : any[] = [];

  constructor(){
    this.standardList = (data as any);
  }

  getStandard (name: any) {
    for( let i = 0; i < this.standardList.length; ++i){
      if ( this.standardList[i].name === name ) {
        return this.standardList[i];
      }
    }
    return { "name": name };
  }

  getAllStandards() {
    let s = [];
    for( let i = 0; i < this.standardList.length; ++i){
      s.push(this.standardList[i]);
    }
    return s;
  }
}
