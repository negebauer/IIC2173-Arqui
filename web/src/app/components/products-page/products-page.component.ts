import { Component, OnInit } from '@angular/core';
import { HttpServiceProvider } from '../../services/HttpServiceProvicer';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})

export class ProductsPageComponent implements OnInit {
  public data;
  public categories;
  public products = [];
  public isCache = false;
  public date = '09-10-2017';
  public subs = null;

  constructor(public _http: HttpServiceProvider, private session: SessionService) {
    this.session.isLoggedIn()
      .subscribe((resp) => {
        console.log(resp)
        if (resp) {
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user.token)
          this.getProducts(user.token);
        } else {
          this.getProducts(null);
        }
      });
  }

  getProducts(token) {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    this.subs = this._http.getProducts(token).subscribe((response) => {
      if (response.source == 'cache') {
        this.isCache = true;
        this.date = response['updatedAt'];
      }
      this.products = response['products'];
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  addToCart(product) {
    this.session.addToCart(product);
  }

}
