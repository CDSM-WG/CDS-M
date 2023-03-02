import { Component, OnInit, Inject } from '@angular/core';
import { ExportService } from 'src/services/export.service';
import { UseCaseService } from '../../services/use-case.service';
import { APP_BASE_HREF } from "@angular/common";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-your-receipt',
  templateUrl: './your-receipt.component.html',
  styleUrls: ['./your-receipt.component.css']
})
export class YourReceiptComponent implements OnInit {

  toastShown: boolean = false;
  url: string = "";

  constructor(private exportService: ExportService
      	, private useCaseService: UseCaseService
        , private clipboard: Clipboard
        , @Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
    setTimeout(() => this.download(), 2000);
  }

  download() {
    this.exportService.urlListener.subscribe(x => this.ready(x));
    this.exportService.export("UC", this.useCaseService.getGrandTotal());
  }

  ready(r: string) {
    this.url = this.baseHref + "/standards?name=" +  r;
    this.clipboard.copy( this.url );
    this.toastShown = true;
  }

  urlGenerated() {
    if (this.url != "") {
      return false;
    }
    return true;
  }

  reset() {
    this.exportService.reset();
    this.useCaseService.reset();
  }

  hideToast() {
    this.toastShown = false;
  }
}
