import { Component, OnInit, OnDestroy } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-standard-store',
  templateUrl: './standard-store.component.html',
  styleUrls: ['./standard-store.component.css']
})
export class StandardStoreComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<any>;
  obs!: Observable<any>;

  constructor(private standardService: StandardService) { 
    this.dataSource = new MatTableDataSource<any>(standardService.getAllStandards());
  }

  ngOnInit(): void {
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}
