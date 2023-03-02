import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { ExportService } from 'src/services/export.service';
import { UseCaseService } from '../../services/use-case.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { APP_BASE_HREF } from "@angular/common";

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
  
  toastShown: boolean = false;
  url: string = "";

  constructor(private changeDetectorRef: ChangeDetectorRef
    , private standardService: StandardService
    , private exportService: ExportService
    , private usecaseService: UseCaseService
    , private clipboard: Clipboard
    , @Inject(APP_BASE_HREF) private baseHref: string
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

    this.exportService.urlListener.subscribe(x => this.ready(x));
    this.exportService.export("ICT", "A");
  }

  hideToast() {
    this.toastShown = false;
  }

  ready(r: string){
    let base = this.baseHref;

    if (base.indexOf('localhost') > 0){
      base = "http://localhost:4201/";
    }
  
    this.url = base + "/assets/uploads/" +  r;
    this.clipboard.copy( this.url );
    //             console.log('got r', r.name);
    //             this.urlListener.next("http://localhost:4200/standards?name=" + r.name);
    //this.url = r.replace('/standards?name=','/assets/uploads/');
    this.toastShown = true;
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
