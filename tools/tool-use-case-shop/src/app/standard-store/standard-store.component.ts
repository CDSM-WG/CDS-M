import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UseCaseService } from '../../services/use-case.service';

@Component({
  selector: 'app-standard-store',
  templateUrl: './standard-store.component.html',
  styleUrls: ['./standard-store.component.css']
})
export class StandardStoreComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<any>;
  dataSourceSelected!: MatTableDataSource<any>;

  obs!: Observable<any>;
  obsSelected!: Observable<any>;

  constructor(private standardService: StandardService, private useCaseService: UseCaseService) {
    this.dataSource = new MatTableDataSource<any>(this.standardService.getAllStandards());

    this.dataSource.data.sort((a: any, b: any) => {
      if (this.useCaseService.isStandardInCart(a.name)) {
        return -1;
      }
      else if (this.useCaseService.isStandardInCart(b.name)) {
        return 1;
      }
      return 0;
    });

    this.dataSourceSelected = new MatTableDataSource<any>(this.standardService.selectedStandards);
    this.loadStandards();
  }

  loadStandards() {
    this.standardService.selectedStandards = [];
    for (let i = 0; i < this.useCaseService.cart.length; i++) {
      let uc = this.useCaseService.getUseCase(this.useCaseService.cart[i]);
      if (uc.standards != null) {
        for (let j = 0; j < uc.standards.length; j++) {
          if (this.useCaseService.isStandardInCart(uc.standards[j].name)) {
            if (!this.alreadyInSelected(uc.standards[j])) {
              this.standardService.selectedStandards.push(uc.standards[j]);
            }
          }
        }
      }
    }
    this.dataSourceSelected.data = this.standardService.selectedStandards;
  }

  alreadyInSelected(standard: any) {
    for (let i = 0; i < this.standardService.selectedStandards.length; i++) {
      let s = this.standardService.selectedStandards[i];
      if (s.name === standard.name) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.obs = this.dataSource.connect();
    this.obsSelected = this.dataSourceSelected.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    if (this.dataSourceSelected) {
      this.dataSourceSelected.disconnect();
    }
  }

  uploadFile(event: any) {
    let selectedFile = event.target.files[0];
    this.processFile(selectedFile);
  }

  private processFile( file: any ){
    this.useCaseService.useCaseList = [];
    this.standardService.selectedStandards = [];
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {

      if (fileReader.result != null) {
        let jsonObj = (JSON.parse(fileReader.result.toString()));
        this.standardService.standardList = jsonObj.standards;
        this.useCaseService.useCaseList = jsonObj.useCases;
        for (let i = 0; i < this.useCaseService.useCaseList.length; i++) {
          this.useCaseService.addToCart(this.useCaseService.useCaseList[i].id);
          let uc = this.useCaseService.useCaseList[i];
          if (uc.standards != null) {
            for (let k = 0; k < uc.standards.length; k++) {
              let s = uc.standards[k];
              if (!this.alreadyInSelected(s)) {
                let standard = this.standardService.getStandard(s.name);
                this.standardService.selectedStandards.push(standard);
              }
            }
          }
        }

        this.standardService.selectedStandards = this.standardService.selectedStandards.sort((a, b) => {
          if (a.checked) return -1;
          if (b.checked) return 1;
          return 0;
        }
        )

        this.dataSource.data = this.standardService.selectedStandards;
        this.dataSourceSelected.data = this.standardService.selectedStandards;

      }
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  onFilter(e: any) {
    if (e != null && e.target != null) {
      let value = e.target.value;
      this.filter(e, value);
    }
  }

  filter(event: Event, value: string) {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.processFile(files[0]);
    }
  }

  @HostListener('dragover', ['$event']) onDragOver(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    console.log('drag over');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    console.log('drag leave');
  }
}
