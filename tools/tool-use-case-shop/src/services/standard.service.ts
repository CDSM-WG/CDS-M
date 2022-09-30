import { Injectable } from '@angular/core';
import * as data from '../app/_files/standards.json';

@Injectable()
export class StandardService {
  getPrivacyGrade(standard: string, ucStandard: any) {
    if (ucStandard != null) {
      if (ucStandard.dataProtection != null){
        return ucStandard.dataProtection;
      }
    }
    let s = this.getStandard(standard);
    return s.privacy;
  }

  standardList: any[] = [];
  selectedStandards: any[] = [];

  constructor() {
    this.standardList = (data as any);
  }

  getStandard(name: any) {
    for (let i = 0; i < this.standardList.length; ++i) {
      if (this.standardList[i].name === name) {
        return this.standardList[i];
      }
    }
    return { "name": name };
  }

  getAllStandards() {
    let s = [];
    for (let i = 0; i < this.standardList.length; ++i) {
      let standard = this.standardList[i];
      s.push(standard);
    }
    return s;
  }

  selectStandard(standard: any) {
    if (this.selectedStandards.findIndex(x => { return x.name === standard.name; }) == -1) {
      this.selectedStandards.push(standard);
    }
  }

  deselectStandard(standard: any) {
    let index = this.selectedStandards.indexOf(standard);
    if (index >= 0) {
      this.selectedStandards.splice(index, 1);
    }
  }
}
