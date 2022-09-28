import { Component, OnInit } from '@angular/core';
import { ExportService } from 'src/services/export.service';
import { UseCaseService } from '../../services/use-case.service';

@Component({
  selector: 'app-your-receipt',
  templateUrl: './your-receipt.component.html',
  styleUrls: ['./your-receipt.component.css']
})
export class YourReceiptComponent implements OnInit {

  constructor(private exportService: ExportService, private useCaseService: UseCaseService) { }

  ngOnInit(): void {
    setTimeout(() => this.download(), 2000);
  }

  download(){
    this.exportService.export("UC", this.useCaseService.getGrandTotal());
  }

  reset() {
    this.exportService.reset();
    this.useCaseService.reset();
  }
}
