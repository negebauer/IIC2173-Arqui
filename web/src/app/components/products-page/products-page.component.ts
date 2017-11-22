import { Component, OnInit } from '@angular/core';
import { HttpServiceProvider } from '../../services/HttpServiceProvicer';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})

export class ProductsPageComponent implements OnInit {
  public data;
  public categories;
  public products = [];
  public isCache = false;
  public date = '09-10-2017';
  public subs = null;
  public buttonState = 'More products!'
  private available = false
  public page = 0
  public buttonSubs = null
  public searchstr = null;
  public user;
  searcherr;


  constructor(public _http: HttpServiceProvider, private session: SessionService) {
    this.session.isLoggedIn()
      .subscribe((resp) => {
        if (resp) {
          this.available = true
          this.refreshPage()
          this.user = JSON.parse(localStorage.getItem('user'));
          this.products = []
          this.nextPage()
          this.getProducts(this.user.token, this.page);
          
        } else {
          this.refreshPage()
          this.getProducts(null, this.page);
          this.user = null;
        }
      });
  }

  refreshPage() {
    this.page = 0
  }

  nextPage() {
    this.page = this.page + 1
  }

  getProducts(token, page) {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    this.subs = this._http.getProducts(token, page).subscribe((response) => {
      if (response.source == 'cache') {
        this.isCache = true;
        this.date = response['updatedAt'];
      }
      const newProducts = response['products']

      if (newProducts.length == 0) {
        this.buttonState = 'No more products available'
      } else {
        this.products = this.products.concat(newProducts);
      }
      
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  addToCart(product) {
    this.session.addToCart(product);
  }

  next(){

    if (this.buttonSubs) {
      this.buttonSubs.unsubscribe()
    }

    this.buttonSubs = this.session.isLoggedIn()
      .subscribe((resp) => {
        if (resp) {
          this.nextPage()
          const user = JSON.parse(localStorage.getItem('user'));
          this.getProducts(user.token, this.page);
        } else {
          this.available = false
          this.refreshPage()
          this.products = []
          this.getProducts(null, true);
        }
      })
  }

  public search() {
    if (this.searchstr && this.searchstr.length > 0) {
      this.searcherr = null;
      console.log("we've search! " + this.searchstr)
      
      this._http.search(this.user.token, this.searchstr).subscribe((response) => {
        this.products = response['products']
      }, (err) => {
        this.searcherr = "No se encontraron productos con " + this.searchstr + "..."
        console.log(err);
      })      
    } else if (this.searcherr){
      this.searcherr = null;
      this.getProducts(this.user.token,this.page);
      //this last else if is to prevent several unnecesary requests.
    } else if (this.searchstr === '') {
      this.getProducts(this.user.token, this.page);
      this.searchstr = null;
    }
  }

}
