import { Component, Input, OnInit } from '@angular/core';
import { StandardService } from 'src/services/standard.service';

@Component({
  selector: 'app-metric-ticket',
  templateUrl: './metric-ticket.component.html',
  styleUrls: ['./metric-ticket.component.css']
})
export class MetricTicketComponent implements OnInit {

  @Input()
  data: any;

  @Input()
  standards: any;

  @Input()
  index: number = 0;

  popupDetails = "";
  showPopup = false;  

  collapsed: boolean = false;
  standardNames: any[] = [];
  standardsToShow: any[] = [];

  constructor(private standardService: StandardService) { }

  ngOnInit(): void {
    this.collapsed = false; // this.index != 0;

    this.standardsToShow = this.data.standards;
    if (this.standardsToShow == null || this.standardsToShow.length == 0) {
      this.standardsToShow = this.standards;
    }

    for (let s of this.standardsToShow) {
      let parts = s.name.split('-');
      let standardName = parts.length > 1 ? parts[0] : s.name;

      if (standardName == "fixed"){
        standardName = "fixed-format";
      } else if (standardName == "TOMP"){
        standardName = "TOMP";
      } else if (standardName == "MDS") {
        standardName = parts[0] + "-" + parts[1];
      }

      if (this.standardNames.indexOf(standardName) == -1) {
        this.standardNames.push(standardName);
      }
    }

    this.standardNames.sort((a: any, b: any) => {
      let aN = a.charCodeAt(0);
      let bN = b.charCodeAt(0);
      if (aN == bN) {
        return a.length > b.length ? 1 : -1;
      }
      return aN > bN ? 1 : -1;
    });

    this.standardsToShow.sort((a: any, b: any) => {
      let aN = a.name.charCodeAt(0);
      let bN = b.name.charCodeAt(0);
      if (aN == bN) {
        return a.name.length > b.name.length ? 1 : -1;
      }
      return aN > bN ? 1 : -1;
    });
  }

  formatName(name: string, endpoint: string){
    if(name == endpoint){
      return name;
    }
    return endpoint.replace(name, '');
  }

  getPrivacy(name: string) {
    let standard = this.standardService.getStandard(name);
    return standard.privacy;    
  }

  getConfidentiality(name: string) {
    let standard = this.standardService.getStandard(name);
    return standard.confidentiality;    
  }

  getInteroperability(name: string) {
    let standard = this.standardService.getStandard(name);
    return standard.interoperability;    
  }

  hasDataStandards() {
    if (this.standardsToShow == null) {
      return false;
    }
    return this.standardsToShow.length > 0;
  }

  showStandards() {
    if (this.collapsed) {
      return false;
    }
    return this.hasDataStandards();
  }

  isCollapsed() {
    return this.collapsed;
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  showDetails(standard: any){
    let standardObject = this.standardService.getStandard(standard.name);
    this.popupDetails = standardObject.description;
    this.showPopup = true;
    return this.popupDetails;
  }

  getGrade(standard: any){
    return this.standardService.getPrivacyGrade(standard.name, null);
  }
}
