import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UseCaseStoreComponent } from './use-case-store/use-case-store.component';
import { MainComponent } from './main/main.component';
import { UseCaseDetailComponent } from './use-case-detail/use-case-detail.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: MainComponent }
  , { path: 'store', component: UseCaseStoreComponent }
  , { path: 'use-case', component: UseCaseDetailComponent }
  , { path: 'cart', component: CartComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
