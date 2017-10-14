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
  public date = "09-10-2017";

  constructor(public _http: HttpServiceProvider, private session: SessionService) {
  	_http.getProducts().subscribe((response) => {
      if (response.source == 'cache') {
        this.isCache = true;
        this.date = response['updatedAt']
      }
      this.products = response['products'];
    }, (err) => {
      console.log(err)
    })
  }

  ngOnInit() {
  }

  addToCart(product) {
    this.session.addToCart(product);
  }

}
