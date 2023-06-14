import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from '../app/_files/use-cases.json';
import { StandardService } from './standard.service';

@Injectable()
export class UseCaseService {

  useCaseList: any[] = [];
  cartContent: any[] = [];
  addedUseCaseInCart: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  grades: string[] = ['A', 'B', 'C', 'D', 'E']

  constructor(private standardService: StandardService) {
    this.loadUseCases();
  }

  reset() {
    this.loadUseCases();
    this.cartContent = [];
  }

  loadUseCases() {
    this.useCaseList = [].slice.call(data);
  }

  getUseCase(id: any) {
    for (let i = 0; i < this.useCaseList.length; ++i) {
      if (this.useCaseList[i].id === id) {
        return this.useCaseList[i];
      }
    }
    return null;
  }

  cartContentSize() {
    return this.cartContent.length;
  }

  getUseCases() {
    return this.useCaseList;
  }

  removeFromCart(id: any) {
    let index = this.cartContent.findIndex(x => x.id === id);
    if (index >= 0) {
      this.cartContent.splice(index, 1);
    }
  }

  addToCart(id: any) {
    let index = this.cartContent.findIndex(x => x.id === id);
    if (index === -1) {
      let uc = this.useCaseList.filter(x => x.id === id);
      if (uc[0].standards != undefined) {
        for (let i = 0; i < uc[0].standards.length; ++i) {
          if (uc[0].standards[i].dataProtection === "A") {
            uc[0].standards[i].checked = true;
          }
        }
      }
      this.cartContent.push(uc[0]);
      this.addedUseCaseInCart.next(uc[0]);
    }
    else {
      this.removeFromCart(id);
    }
  }

  getSelectedStandards(){
    this.standardService.selectedStandards = [];
    for (let i = 0; i < this.cartContent.length; i++) {
      let uc = this.cartContent[i];
      if (uc.standards != null) {
        for (let j = 0; j < uc.standards.length; j++) {
          if (this.isStandardInCart(uc.standards[j].name)) {
            if (!this.alreadyInSelected(uc.standards[j])) {
              this.standardService.selectedStandards.push(uc.standards[j]);
            }
          }
        }
      }
    }
    return this.standardService.selectedStandards;
  }

  alreadyInSelected(standard: any) {
    if ( this.standardService.isGenericFormat(standard.name) ) {
      return false;
    }

    for (let i = 0; i < this.standardService.selectedStandards.length; i++) {
      let s = this.standardService.selectedStandards[i];
      if (s.name === standard.name) {
        return true;
      }
    }
    return false;
  }

  isInCart(id: any) {
    let found = this.cartContent.findIndex(x => x.id === id) >= 0;
    return found;
  }

  isStandardInCart(name: string) {
    for (let i = 0; i < this.cartContent.length; i++) {
      let uc = this.cartContent[i];
      if (uc != null && uc.standards != null) {
        for (let j = 0; j < uc.standards.length; j++) {
          let s = uc.standards[j];
          if (s.name === name && s.checked != null && s.checked === true)
            return true;
        }
      }
    }
    return false;
  }

  isStandardInUseCaseCart(name: string) {
    for (let i = 0; i < this.cartContent.length; i++) {
      let uc = this.cartContent[i];
      for (let j = 0; j < uc.standards.length; j++) {
        let s = uc.standards[j];
        if (s.name === name)
          return true;
      }
    }
    return false;
  }

  getAllStandards(): any[] {
    let result: any[] = []
    for (let i = 0; i < this.cartContent.length; i++) {
      let uc = this.cartContent[i];
      for (let j = 0; j < uc.standards.length; j++) {
        let s = uc.standards[j];
        let found = false;
        for (let k = 0; k < result.length; k++) {
          if (result[k].name === s.name) {
            found = true;
            break;
          }
        }
        if (!found) {
          result.push(s);
        }

      }
    }
    return result;
  }

  getGrade(uc: any) {
    let maxGrade = "";
    if (uc.standards != undefined) {
      for (let i = 0; i < uc.standards.length; ++i) {
        if (uc.standards[i].checked) {
          let grade = this.standardService.getPrivacyGrade(uc.standards[i].name, uc);
          if (this.grades.indexOf(grade) == -1) {
            maxGrade = "?";
            break;
          }
          else if (grade > maxGrade) {
            maxGrade = grade;
          }
        }
      }

      for (let j = 0; j < uc.metrics.length; j++) {
        let metric = uc.metrics[j];
        for (let i = 0; i < metric.standards.length; ++i) {
          let standard = metric.standards[i];
          if (standard.checked) {
            let grade = this.standardService.getPrivacyGrade(standard.name, standard);
            if (this.grades.indexOf(grade) == -1) {
              maxGrade = "?";
              break;
            }
            else if (grade > maxGrade) {
              maxGrade = grade;
            }
          }
        }
      }
    }
    return maxGrade;
  }

  getGrandTotal() {
    let maxGrade = "";
    for (let i = 0; i < this.cartContent.length; i++) {
      let grade = this.getGrade(this.cartContent[i]);
      if (this.grades.indexOf(grade) == -1) {
        maxGrade = "?";
        break;
      }
      else if (grade > maxGrade) {
        maxGrade = grade;
      }
    }
    return maxGrade;
  }

  parseStandards(uc: any) {
    for (let k = 0; k < uc.standards.length; k++) {
      let s = uc.standards[k];
      if (!this.alreadyInSelected(s)) {
        let name = s.name;
        let standard = this.standardService.getStandard(name);
        
        for (var prop in s) {
          standard[prop] = s[prop];
        }

        this.standardService.selectedStandards.push(standard);

        if (this.standardService.standardList.filter( x => x.name == standard.name ).length == 0){
          this.standardService.standardList.push(standard);
        }
      }

      if (s.requiredEndPoints != null) {
        for (let l = 0; l < s.requiredEndPoints.length; l++) {
          let re = s.requiredEndPoints[l];
          let res = this.standardService.getStandard(re);
          if (!this.alreadyInSelected(res)) {
            this.standardService.selectedStandards.push(res);
          }
          res.checked = true;
        }
      }
      if (s.conditionalRequiredEndPoints != null) {
        for (let l = 0; l < s.conditionalRequiredEndPoints.length; l++) {
          let re = s.conditionalRequiredEndPoints[l];
          let res = this.standardService.getStandard(re);
          if (!this.alreadyInSelected(res)) {
            this.standardService.selectedStandards.push(res);
          }
        }
      }
    }
  }

}
