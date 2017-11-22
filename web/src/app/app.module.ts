import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { CartComponent } from './components/cart/cart.component';
import { HttpServiceProvider } from './services/HttpServiceProvicer';
import { SessionService } from './services/session.service';
import { LoginComponent } from './components/login/login.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsPageComponent,
    CartComponent,
    LoginComponent,
    PurchaseHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [HttpServiceProvider, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
