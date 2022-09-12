import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource }  from '@angular/material/table';
import { Observable } from 'rxjs';
import { UseCaseService } from '../../services/use-case.service';

export interface Card {
  name: string;
}

@Component({
  selector: 'app-use-case-store',
  templateUrl: './use-case-store.component.html',
  styleUrls: ['./use-case-store.component.css']
})
export class UseCaseStoreComponent implements OnInit, OnDestroy {

  useCases: any[]  = [];

  filterOptions: string[] = ["All", "Transparency", "Dynamic", "Liveability","Safety","Sustainability"]

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private useCaseService: UseCaseService) 
  { 
    this.useCases = this.useCaseService.useCaseList;
    this.dataSource = new MatTableDataSource<any>(this.useCases);
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.filterPredicate = function customFilter(data, filter:string) : boolean {
      if (data.theme.toLowerCase().indexOf(filter) >= 0) {
        return true;
      }
      else if (data.story.iWouldLikeTo.toLowerCase().indexOf(filter) >= 0) {
        return true;
      }
      else if (data.story.inOrderTo.toLowerCase().indexOf(filter) >= 0) {
        return true;
      }
      else if (data.id.toLowerCase().indexOf(filter) >= 0) {
        return true;
      }
      else if ( data.tags != null ){
        for ( let i = 0; i < data.tags.length; ++i ) {
          if (data.tags[i].toLowerCase().indexOf(filter) >= 0){
            return true;
          }
        }
      }
      return false;
    }
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  getLength() {
    return this.dataSource.data.length;
  }

  onFilter(e: any) {
    if( e != null && e.target != null ) {
      let value = e.target.value;
      this.filter(e, value);
    }
  }

  filter( event: Event, value: string ){
    if (this.dataSource.filter === value || value == "All"){
      this.dataSource.filter = "";
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
}
