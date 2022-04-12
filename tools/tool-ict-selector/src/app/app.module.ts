import "@angular/compiler";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatSortModule} from '@angular/material/sort';

import { StandardsComponent } from './standards/standards.component';
import { TransportComponent } from './transport/transport.component';
import { CertificatesComponent } from './certificates/certificates.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ProcessingComponent } from './processing/processing.component';
import { ArchivingComponent } from './archiving/archiving.component';
import { ExImportButtonComponent } from './ex-import-button/ex-import-button.component';
import { UseCaseService } from '../services/use-case.service';

@NgModule({
  declarations: [
    AppComponent,
    StandardsComponent,
    TransportComponent,
    CertificatesComponent,
    ProcessingComponent,
    ArchivingComponent,
    ExImportButtonComponent
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule
  ],
  providers: [UseCaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);