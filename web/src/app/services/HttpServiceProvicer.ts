import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpServiceProvider {

  public apiUrl = environment.api || 'http://localhost:3000';

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
      .map((res) => res.json())
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
  public getProducts() {
    return this.http
      .get(`${this.apiUrl}/products`)
      .map((response) => response.json());
  }

  // Handle Orders
  public placeOrder() {
    return;
  }
}
