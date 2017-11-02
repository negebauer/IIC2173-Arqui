import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HttpServiceProvider } from '../../services/HttpServiceProvicer';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
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

  public emptyCart() {
    this.session.emptyCart();
  }

  makePurchase() {
    if (this.user && this.cart.length > 0) {
      let ids = this.cart.map((product) => {
        return product.id
      })
      this.api.placeOrder(ids, this.user.token)
        .subscribe((response) => {
          alert('Orden completada exitosamente!');
          this.emptyCart();
          this.hideCart();
        }, (err) => {
          alert("Hubo un error al generar la orden, intente más tarde")
        });
    } else {
      alert('Debes iniciar sesión primero!');
    }
  }

}
