import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { ExportService } from 'src/services/export.service';
import { UseCaseService } from '../../services/use-case.service';

@Component({
  selector: 'app-prepare-selection',
  templateUrl: './prepare-selection.component.html',
  styleUrls: ['./prepare-selection.component.css'],
  host: {'window:beforeunload':'onClose()'}
})
export class PrepareSelectionComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  obs!: Observable<any>;

  undoShowed: boolean = false;

  showDialog = false;
  subject = new Subject<boolean>();

  constructor(private changeDetectorRef: ChangeDetectorRef
    , private standardService: StandardService
    , private exportService: ExportService
    , private usecaseService: UseCaseService
  ) {
    this.dataSource = new MatTableDataSource<any>(standardService.selectedStandards);

    for (let s of this.standardService.selectedStandards) {
      s.step = 0;
    }

    this.standardService.standardRemoved.subscribe(
      (x) => {
        this.undoShowed = true;
      }
    );
    this.undoShowed = false;
  }

  undo() {
    this.standardService.undoDeselect();
    this.undoShowed = false;
  }

  hideUndo() {
    this.undoShowed = false;
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

  grandTotal() {
    let maxGrade = "?";
    for (let i = 0; i < this.usecaseService.useCaseList.length; i++) {
      let grade = this.usecaseService.getGrade(this.usecaseService.useCaseList[i]);
      if (this.usecaseService.grades.indexOf(grade) == -1) {
        maxGrade = "?";
        break;
      }
      else if (grade > maxGrade) {
        maxGrade = grade;
      }
    }
    return maxGrade;
  }

  export() {
    this.exportService.useCases = this.usecaseService.useCaseList;
    this.exportService.specification.useCases = this.usecaseService.useCaseList;
    this.exportService.specification.standards = this.dataSource.data;
    this.exportService.export("ICT", "A");
  }

  isDisabled() {
    let result: boolean = false;
    for (let s of this.standardService.selectedStandards) {
      if (s.step < 4) {
        return true;
      }
    }
    return result;
  }

  onClose() {
    return false;
  }

  openDialog() {
    this.showDialog = true;
  }

  onSelection($event: any) {
    this.showDialog = false;
    this.subject.next($event);
  }
}
