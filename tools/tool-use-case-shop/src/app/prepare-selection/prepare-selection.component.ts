import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-prepare-selection',
  templateUrl: './prepare-selection.component.html',
  styleUrls: ['./prepare-selection.component.css']
})
export class PrepareSelectionComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  obs!: Observable<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private changeDetectorRef: ChangeDetectorRef, private standardService: StandardService) { 
    this.dataSource = new MatTableDataSource<any>(standardService.selectedStandards);
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
