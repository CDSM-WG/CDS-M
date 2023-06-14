import { Injectable } from '@angular/core';
import * as data from '../app/_files/standards.json';
import { BehaviorSubject, Observable } from 'rxjs';
import allStandards from '../app/_files/standards.json'

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
    this.standardList = [].slice.call(data);
  }

  isGenericFormat(format: string){
    let name = format.toLowerCase();
    return name.startsWith('csv')
        || name.startsWith('json')
        || name.startsWith('geojson')
        || name.startsWith('xml')
        || name.startsWith('shapefile');
  }

  getStandard(name: string) {
    let all = this.getAllStandards();
    // if( this.isGenericFormat(name)) {
    //   name = name.split(' ')[0];
    // }

    for (let i = 0; i < all.length; ++i) {
      if (all[i].name === name) {
        return all[i];
      }
    }
    return { "name": name };
  }

  getAllStandards() {
    let s = [];
    let array : any[] = allStandards;
    for (let i = 0; i < array.length; ++i) {
      let standard = array[i];
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
