import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UseCaseStoreComponent } from './use-case-store/use-case-store.component';
import { MainComponent } from './main/main.component';
import { UseCaseDetailComponent } from './use-case-detail/use-case-detail.component';
import { CartComponent } from './cart/cart.component';
import { StandardStoreComponent } from './standard-store/standard-store.component';
import { PrepareSelectionComponent } from './prepare-selection/prepare-selection.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { YourReceiptComponent } from './your-receipt/your-receipt.component';

const routes: Routes = [
  { path: '', component: MainComponent }
  , { path: 'store', component: UseCaseStoreComponent }
  , { path: 'use-case', component: UseCaseDetailComponent }
  , { path: 'cart', component: CartComponent }
  , { path: 'standards', component: StandardStoreComponent }
  , { path: 'preparation', component: PrepareSelectionComponent }
  , { path: 'checkout', component: CheckoutComponent }
  , { path: 'receipt', component: YourReceiptComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
