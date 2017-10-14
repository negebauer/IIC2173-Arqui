import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HttpServiceProvider } from '../../services/HttpServiceProvicer';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart = [];

  constructor(private session: SessionService, private api: HttpServiceProvider) {
  	session.getCart()
      .subscribe((cart) => {
  		  this.cart = cart;
  	});
  }

  ngOnInit() {
  }

  public hideCart() {
    this.session.hideCart();
  }

  removeProduct(product) {
    this.session.removeFromCart(product);
  }

  makePurchase() {
    //this.api.purchase()
    alert('Nuestro proveedor aun no permite realizar compras');
  }

}
