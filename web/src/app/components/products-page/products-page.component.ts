import { Component, OnInit } from '@angular/core';
import { HttpServiceProvider } from '../../services/HttpServiceProvicer';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})

export class ProductsPageComponent implements OnInit {
  public products;

  constructor(public _http: HttpServiceProvider) {
  	this.products = _http.getProducts();
  	console.log(this.products);
  }

  ngOnInit() {
  }

}
