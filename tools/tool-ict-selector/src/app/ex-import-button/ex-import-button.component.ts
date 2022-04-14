import { Component, OnInit } from '@angular/core';
import { UseCaseService } from '../../services/use-case.service';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-ex-import-button',
  templateUrl: './ex-import-button.component.html',
  styleUrls: ['./ex-import-button.component.css']
})
export class ExImportButtonComponent implements OnInit {

  selectedFile: any;
  jsonObj : any = {};
  service: UseCaseService;
  exportService: ExportService;

  constructor(useCaseService: UseCaseService, exportService: ExportService) { 
    this.service = useCaseService;
    this.exportService = exportService;
  }

  ngOnInit(): void {
  }

  export(): void {
    this.exportService.signalExport.next("export");
    this.exportService.export();
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      if (fileReader.result != null) {
        this.jsonObj=(JSON.parse(fileReader.result.toString()));
        this.service.useCases.next(this.jsonObj);
      }
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }
}
