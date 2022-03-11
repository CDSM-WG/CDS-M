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
    var json = JSON.stringify(this.jsons);
   // var uri = this.domSanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));

    const data: Blob = new Blob([json], { type: "text/json" });
    FileSaver.saveAs(data, "CDS-M-UC-" + new Date().getTime() + ".json");
  }

}
