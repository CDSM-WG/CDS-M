import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { MetricTicketComponent } from './metric-ticket/metric-ticket.component';
import { FooterComponent } from './footer/footer.component';
import { FilledPrimaryComponent } from './filled-primary/filled-primary.component';
import { FilledSecondaryComponent } from './filled-secondary/filled-secondary.component';
import { OutlinePrimaryComponent } from './outline-primary/outline-primary.component';
import { SmallButtonComponent } from './small-button/small-button.component';
import { LinkSecondaryComponent } from './link-secondary/link-secondary.component';
import { StandardStoreComponent } from './standard-store/standard-store.component';
import { StandardTicketComponent } from './standard-ticket/standard-ticket.component';
import { HttpClientModule } from '@angular/common/http';
import { PrepareSelectionComponent } from './prepare-selection/prepare-selection.component';
import { PrepareStandardTicketComponent } from './prepare-standard-ticket/prepare-standard-ticket.component';
import { ConfigStandardComponent } from './config-standard/config-standard.component';
import { ConfigAuthenticationComponent } from './config-authentication/config-authentication.component';
import { ConfigFieldsComponent } from './config-fields/config-fields.component';
import { RemoveCamelCase } from './remove-camel-case-pipe';

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
    ReplaceUnderscorePipe,
    MetricTicketComponent,
    FooterComponent,
    FilledPrimaryComponent,
    FilledSecondaryComponent,
    OutlinePrimaryComponent,
    SmallButtonComponent,
    LinkSecondaryComponent,
    StandardStoreComponent,
    StandardTicketComponent,
    PrepareSelectionComponent,
    PrepareStandardTicketComponent,
    ConfigStandardComponent,
    ConfigAuthenticationComponent,
    ConfigFieldsComponent,
    RemoveCamelCase
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule
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
