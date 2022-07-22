import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionComponent } from './selection/selection.component';
import { UseCaseViewComponent } from './use-case-view/use-case-view.component';
import { UseCaseTileComponent } from './use-case-tile/use-case-tile.component';
import { ExportButtonComponent } from './export-button/export-button.component';
import { UseCaseService } from '../services/use-case.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    UseCaseViewComponent,
    UseCaseTileComponent,
    ExportButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatTreeModule,
    MatIconModule, 
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [ UseCaseService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
