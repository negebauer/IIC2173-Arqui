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
  isLogged;
  user;

  constructor(private session: SessionService, private api: HttpServiceProvider) {
  	session.getCart()
      .subscribe((cart) => {
  		  this.cart = cart;
  	});
  }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe((resp) => {
        this.isLogged = resp;
        if (resp) {
          this.user = JSON.parse(localStorage.getItem('user'));
        } else {
          this.user = null;
        }
      });

  }

  public hideCart() {
    this.session.hideCart();
  }

  removeProduct(product) {
    this.session.removeFromCart(product);
  }

  makePurchase() {
    //this.api.purchase()
    if (this.user && this.cart.length > 0) {
      let ids = this.cart.map((product) => {
        return product.id
      })
      this.api.placeOrder(ids, this.user.token)
        .subscribe((response) => {
          console.log(response);
        })
    } else {
      alert('Debes iniciar sesión primero!');
    }
  }

}
