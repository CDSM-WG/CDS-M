import { Injectable } from '@angular/core';
import * as data from '../app/_files/use-cases.json';
import { StandardService } from './standard.service';

@Injectable()
export class UseCaseService {

  useCaseList: any[] = [];
  cart: any[] = [];
  cartContent: any[] = [];

  grades: string[] = ['A', 'B', 'C', 'D', 'E']

  constructor(private standardService: StandardService) {
    this.loadUseCases();
  }

  reset() {
    this.loadUseCases();
    this.cart = [];
    this.cartContent = [];
  }

  loadUseCases() {
    this.useCaseList = [];
    let list = data;
    for (let i = 0; i < list.length; ++i) {
      let usecase: any = list[i];
      if (usecase.standards != null) {
        let sorted = usecase.standards.sort((aName: any, bName: any) => {
          let a = this.standardService.getStandard(aName.name).privacy;
          let b = this.standardService.getStandard(bName.name).privacy;
          if (a > b) {
            return -1;
          }
          else if (a < b) {
            return 1;
          }
          return 0;
        });
        usecase.standards = sorted;
      }
      this.useCaseList.push(usecase);
    }
  }

  getUseCase(id: any) {
    for (let i = 0; i < this.useCaseList.length; ++i) {
      if (this.useCaseList[i].id === id) {
        return this.useCaseList[i];
      }
    }
    return null;
  }

  removeFromCart(id: any) {
    let index = this.cart.findIndex(x => x === id);
    if (index >= 0) {
      this.cart.splice(index, 1);
      this.cartContent.splice(index, 1);
    }
  }

  addToCart(id: any) {
    let index = this.cart.findIndex(x => x === id);
    if (index === -1) {
      let uc = this.useCaseList.filter(x => x.id === id);
      if (uc[0].standards != undefined) {
        for (let i = 0; i < uc[0].standards.length; ++i) {
          let standard = this.standardService.getStandard(uc[0].standards[i].name);
          if (standard.privacy === "A") {
            uc[0].standards[i].checked = true;
          }
        }
      }
      this.cart.push(id);
      this.cartContent.push(uc[0]);
    }
    else {
      this.removeFromCart(id);
    }
  }

  isInCart(id: any) {
    let found = this.cart.findIndex(x => x === id) >= 0;
    return found;
  }

  isStandardInCart(name: string) {
    for (let i = 0; i < this.cart.length; i++) {
      let uc = this.getUseCase(this.cart[i]);
      if (uc.standards != null) {
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
    for (let i = 0; i < this.cart.length; i++) {
      let uc = this.getUseCase(this.cart[i]);
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
    for (let i = 0; i < this.cart.length; i++) {
      let uc = this.getUseCase(this.cart[i]);
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
          let grade = this.standardService.getPrivacyGrace(uc.standards[i].name);
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
}
