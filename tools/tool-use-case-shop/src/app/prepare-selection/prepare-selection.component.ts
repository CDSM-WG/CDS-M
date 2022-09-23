import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ExportService } from 'src/services/export.service';
import { UseCaseService } from '../../services/use-case.service';

@Component({
  selector: 'app-prepare-selection',
  templateUrl: './prepare-selection.component.html',
  styleUrls: ['./prepare-selection.component.css']
})
export class PrepareSelectionComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  obs!: Observable<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef
    , private standardService: StandardService
    , private exportService: ExportService
    , private usecaseService: UseCaseService) { 
    this.dataSource = new MatTableDataSource<any>(standardService.selectedStandards);
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  export(){
    this.exportService.useCases = this.usecaseService.useCaseList;
    this.exportService.specification.useCases = this.usecaseService.useCaseList;
    this.exportService.specification.standards = this.dataSource.data;
    this.exportService.export("ICT", "A");
  }

}