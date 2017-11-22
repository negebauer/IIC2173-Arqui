import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpServiceProvider {

  //public apiUrl = environment.api || 'http://localhost:3000';

  public apiUrl = 'http://arqss2.ing.puc.cl/api'

  public constructor(private http: Http) {
  }

  //  Handle Users
  public logIn(mail: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers, method: 'post' });
    const body = {
      mail: mail,
      password: password
    };
    return this.http
      .post(`${this.apiUrl}/login`, body, options)
      .map((res) => res.json());
  }

  public signUp(firstName, lastName, mail, address, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers, method: 'post' });
    const body = {
      firstName: firstName,
      lastName: lastName,
      mail: mail,
      address: address,
      password: password
    };
    return this.http
      .post(`${this.apiUrl}/signup`, body, options)
      .map((res) => res.json());
  }

  // Handle Products
  public getProducts(token, page) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) {
      headers.append('Authorization', 'token ' + token);
    }
    const options = new RequestOptions({ headers, method: 'get' });
    return this.http
      .get(`${this.apiUrl}/products?page=${page}`, options)
      .map((response) => response.json());
  }

  public search(token, query) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) {
      headers.append('Authorization', 'token ' + token);
    }
    const params = `?n=12&page=1&query=${query}`
    const options = new RequestOptions({ headers, method: 'get' });
    return this.http
      .get(`${this.apiUrl}/products/search` + params, options)
      .map((response) => response.json());
    
  }

  // Handle Orders
  public placeOrder(ids, token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'token ' + token);
    const options = new RequestOptions({ headers, method: 'post' });
    const body = {
      productsIds: ids
    };
    return this.http
      .post(`${this.apiUrl}/orders`, body, options)
      .map((res) => res.json());
  }

  // Handle Purchase history
  public getHistory(token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) {
      headers.append('Authorization', 'token ' + token);
    }
    const options = new RequestOptions({ headers, method: 'get' });
    return this.http
      .get(`${this.apiUrl}/orders?sort=asc`, options)
      .map((response) => response.json());
  }
}
