import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UseCaseService } from '../../services/use-case.service';
import { StandardService } from '../../services/standard.service';

@Component({
  selector: 'app-use-case-detail',
  templateUrl: './use-case-detail.component.html',
  styleUrls: ['./use-case-detail.component.css']
})
export class UseCaseDetailComponent implements OnInit {

  data: any;
  sortedStandards: any[] = []
  popupDetails = "";
  showPopup = false;

  constructor(private route: ActivatedRoute, private useCaseService: UseCaseService, private standardService: StandardService) 
    { 
      
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe( p => {
      let id = p['id'];
      this.data = this.useCaseService.getUseCase( id );
      this.sortedStandards = this.data.standards.sort( (a:any,b:any) => {
        let standardA = this.standardService.getStandard(a.name);
        let standardB = this.standardService.getStandard(b.name);
        if( standardA.privacy == null || standardA.privacy == "*" ){
          return 1;
        }
        else if( standardB.privacy == null || standardB.privacy == "*"){
          return -1;
        }

        if(standardA.privacy.charCodeAt(0) == standardB.privacy.charCodeAt(0)){
          return a.name.charCodeAt(0) > b.name.charCodeAt(0) ? 1 : -1;
        }

        return standardA.privacy.charCodeAt(0) > standardB.privacy.charCodeAt(0) ? 1 : -1;
      })
    });
  }

  getStandard( name : string ) {
    return this.standardService.getStandard(name);
  }

  addToCart() {
    this.useCaseService.addToCart(this.data.id);
  }

  isInCart() {
    return this.useCaseService.isInCart(this.data.id);
  }

  usesPersonalData(name:string){
    let standard = this.standardService.getStandard(name);
    if (standard.privacy=="A"){
      return "No"
    }
    else if (standard.privacy=="*"){
      return "Possibly"
    }
    else if (standard.privacy==null){
      return "Not yet evaluated"
    }
    return "Yes"
  }

  hasMetrics(){
    return this.data.length > 0;
  }

  showDetails(standard: any){
    let standardObject = this.standardService.getStandard(standard.name);
    this.popupDetails = standardObject.description;
  }

}
