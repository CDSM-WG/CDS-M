import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UseCaseService } from '../../services/use-case.service';
import * as FileSaver from 'file-saver'

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css']
})
export class ExportButtonComponent implements OnInit {

  constructor(private service: UseCaseService, private domSanitizer: DomSanitizer) { }
  jsons : string[] = []

  ngOnInit(): void {
    this.service.deselectUsecase.subscribe(x => this.removeJson(x));
    this.service.selectUsecase.subscribe(x => this.addJson(x));
  }

  removeJson(json: string){
    let index = this.jsons.findIndex(x => x == json);
    console.log(index);
    if( index != -1) {
      this.jsons.splice( index, 1 );
    }
  }

  addJson(json: string){
    if ( json != '' ){
      this.jsons.push(json);
    }
  }

  export(): void {
    var specification = {
      metaData: {
        versionNumber: 1,
        contractor1: "",
        contractor2: "",
        role1: "BOTH",
        role2: "BOTH"
      },
      useCases: this.jsons,
      standards: [],
      contractParts: [],
      termsAndConditions: [],
      transport: [],
      processing: [],
      archive: []
    }

    var json = JSON.stringify(specification);
    const data: Blob = new Blob([json], { type: "text/json" });
    FileSaver.saveAs(data, "CDS-M-UC-" + new Date().getTime() + ".json");
  }

}
