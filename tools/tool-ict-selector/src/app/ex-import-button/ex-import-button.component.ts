import { Component, OnInit } from '@angular/core';
import { UseCaseService } from '../../services/use-case.service';

@Component({
  selector: 'app-ex-import-button',
  templateUrl: './ex-import-button.component.html',
  styleUrls: ['./ex-import-button.component.css']
})
export class ExImportButtonComponent implements OnInit {

  selectedFile: any;
  jsonObj : any = {}; // json object
  service: UseCaseService;

  constructor(useCaseService: UseCaseService) { 
    this.service = useCaseService;
  }

  ngOnInit(): void {
  }

  export(): void {

  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      if( fileReader.result != null ){
        console.log(fileReader.result.toString());
        this.jsonObj=(JSON.parse(fileReader.result.toString()));
        this.service.useCases.next(this.jsonObj);
      }
    }
    fileReader.onerror = (error) => {
    console.log(error);
    }
  }
}
