import { Injectable } from '@angular/core';
import * as data from '../app/_files/standards.json';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StandardService {

  deselectedStandard: any = null;
  standardRemoved: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  getPrivacyGrade(standard: string, ucStandard: any) {
    if (ucStandard != null) {
      if (ucStandard.dataProtection != null) {
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
    if (index == -1) {
      for (let i = 0; i < this.selectedStandards.length; i++) {
        if (this.selectedStandards[i].name == standard.name) {
          index = i;
        }
      }
    }
    if (index >= 0) {
      this.standardRemoved.next(this.selectedStandards[index]);
      this.deselectedStandard = this.selectedStandards[index];
      this.selectedStandards.splice(index, 1);
    }
  }

  isStandardSelected(name: string) {
    for (let i = 0; i < this.selectedStandards.length; i++) {
      if (this.selectedStandards[i].name == name) {
        return true;
      }
    }
    return false;
  }

  undoDeselect() {
    if (this.deselectedStandard != null) {
      this.selectedStandards.push(this.deselectedStandard);
      this.deselectedStandard = null;
    }
  }
}
