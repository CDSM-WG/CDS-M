import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'

import { UseCaseStoreComponent } from './use-case-store/use-case-store.component';
import { UseCaseDetailComponent } from './use-case-detail/use-case-detail.component';
import { UseCaseTicketComponent } from './use-case-ticket/use-case-ticket.component';
import { FirstSelectionComponent } from './first-selection/first-selection.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { UseCaseService } from '../services/use-case.service';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlackTicketComponent } from './black-ticket/black-ticket.component';
import { StandardService } from '../services/standard.service';
import { CartComponent } from './cart/cart.component';
import { CartTicketComponent } from './cart-ticket/cart-ticket.component';
import { ExportService } from '../services/export.service';
import { ReplaceUnderscorePipe } from './replace-underscore-pipe';


@NgModule({
  declarations: [
    AppComponent,
    UseCaseStoreComponent,
    UseCaseDetailComponent,
    UseCaseTicketComponent,
    FirstSelectionComponent,
    LearnMoreComponent,
    MostPopularComponent,
    MainComponent,
    BlackTicketComponent,
    CartComponent,
    CartTicketComponent,
    ReplaceUnderscorePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [
    UseCaseService,
    StandardService,
    ExportService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
