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
  public products;
  public isCache = true; 
  public date = "09-10-2017";

  constructor(public _http: HttpServiceProvider, private session: SessionService) {
  	// _http.getProducts().subscribe((response) => {
   //    console.log(response)
   //    if (response.source =="cache") {
   //      this.isCache = true;
   //    }
   //    this.products = response.products;
   //  }, (err) => {
   //    console.log(err)
   //  })

   this.products = {
      "source": "api",
      "products": [
          {
              "id": 10,
              "category": 10,
              "name": "Paracetamol"
          },
          {
              "id": 20,
              "category": 10,
              "name": "Dimetilamina"
          },
          {
              "id": 30,
              "category": 11,
              "name": "Ibuprofeno"
          }
        ]
      }
    }

  ngOnInit() {
  }

  addToCart(product) {
    this.session.addToCart(product);
  }

}
