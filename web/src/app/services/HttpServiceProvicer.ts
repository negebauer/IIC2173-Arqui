import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpServiceProvider {

  public apiUrl = environment.api || 'http://localhost:3000';

  // Maqueta mientras no hay api
  // public products = {
  //   "source": "api",
  //   "categories": [
  //       {
  //           "id": 10,
  //           "context": "MEDICAMENTOS",
  //           "area": "ANALGESICO",
  //           "group": "Aminas",
  //           "products": [
  //               {
  //                   "id": 10,
  //                   "category": 10,
  //                   "name": "Paracetamol"
  //               },
  //               {
  //                   "id": 20,
  //                   "category": 10,
  //                   "name": "Dimetilamina"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 11,
  //           "context": "MEDICAMENTOS",
  //           "area": "ANALGESICO",
  //           "group": "AINES",
  //           "products": [
  //               {
  //                   "id": 30,
  //                   "category": 11,
  //                   "name": "Ibuprofeno"
  //               },
  //               {
  //                   "id": 40,
  //                   "category": 11,
  //                   "name": "Naproxen"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 15,
  //           "context": "MEDICAMENTOS",
  //           "area": "ANALGESICO",
  //           "group": "Cannabinoides",
  //           "products": [
  //               {
  //                   "id": 50,
  //                   "category": 15,
  //                   "name": "Anandamida"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 16,
  //           "context": "MEDICAMENTOS",
  //           "area": "ANALGESICO",
  //           "group": "Opioide",
  //           "products": [
  //               {
  //                   "id": 60,
  //                   "category": 16,
  //                   "name": "Morfina"
  //               },
  //               {
  //                   "id": 80,
  //                   "category": 16,
  //                   "name": "Codeina"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 20,
  //           "context": "MEDICAMENTOS",
  //           "area": "ANTIINFLAMATORIOS",
  //           "group": "Tópico",
  //           "products": []
  //       },
  //       {
  //           "id": 30,
  //           "context": "MEDICAMENTOS",
  //           "area": "ANTIBIOTICOS",
  //           "group": "Tópico",
  //           "products": []
  //       },
  //       {
  //           "id": 50,
  //           "context": "MEDICAMENTOS",
  //           "area": "DIABETES",
  //           "group": "Diabetes",
  //           "products": []
  //       },
  //       {
  //           "id": 60,
  //           "context": "MEDICAMENTOS",
  //           "area": "DERMATOLOGICOS",
  //           "group": "Tópico",
  //           "products": []
  //       },
  //       {
  //           "id": 101,
  //           "context": "BELLEZA",
  //           "area": "DERMATOLOGICOS",
  //           "group": "Protector Solar",
  //           "products": [
  //               {
  //                   "id": 105,
  //                   "category": 101,
  //                   "name": "Factor 30"
  //               },
  //               {
  //                   "id": 104,
  //                   "category": 101,
  //                   "name": "Factor 50"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 105,
  //           "context": "BELLEZA",
  //           "area": "DEPORTIVOS",
  //           "group": "Parches",
  //           "products": [
  //               {
  //                   "id": 121,
  //                   "category": 105,
  //                   "name": "Parche con dibujos"
  //               },
  //               {
  //                   "id": 122,
  //                   "category": 105,
  //                   "name": "Parche"
  //               },
  //               {
  //                   "id": 123,
  //                   "category": 105,
  //                   "name": "Parche deportivo"
  //               },
  //               {
  //                   "id": 141,
  //                   "category": 105,
  //                   "name": "Venda chica"
  //               },
  //               {
  //                   "id": 142,
  //                   "category": 105,
  //                   "name": "Venda grande"
  //               },
  //               {
  //                   "id": 143,
  //                   "category": 105,
  //                   "name": "Venda desechable"
  //               },
  //               {
  //                   "id": 144,
  //                   "category": 105,
  //                   "name": "Venda de articulación"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 106,
  //           "context": "BELLEZA",
  //           "area": "DEPORTIVOS",
  //           "group": "Vendas",
  //           "products": []
  //       },
  //       {
  //           "id": 111,
  //           "context": "BELLEZA",
  //           "area": "PRESENTACIÓN",
  //           "group": "Desodrante de hombre",
  //           "products": [
  //               {
  //                   "id": 1042,
  //                   "category": 111,
  //                   "name": "OldSpice"
  //               },
  //               {
  //                   "id": 1045,
  //                   "category": 111,
  //                   "name": "AXE"
  //               },
  //               {
  //                   "id": 1072,
  //                   "category": 111,
  //                   "name": "Desodrante Nieve"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 112,
  //           "context": "BELLEZA",
  //           "area": "PRESENTACIÓN",
  //           "group": "Desodrante de mujer",
  //           "products": [
  //               {
  //                   "id": 1067,
  //                   "category": 112,
  //                   "name": "Citric"
  //               },
  //               {
  //                   "id": 1073,
  //                   "category": 112,
  //                   "name": "Desodrante Nieve"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 114,
  //           "context": "BELLEZA",
  //           "area": "PRESENTACIÓN",
  //           "group": "Desodrante ambiental",
  //           "products": []
  //       },
  //       {
  //           "id": 141,
  //           "context": "BELLEZA",
  //           "area": "PRESENTACIÓN",
  //           "group": "Perfume de hombre",
  //           "products": []
  //       },
  //       {
  //           "id": 142,
  //           "context": "BELLEZA",
  //           "area": "PRESENTACIÓN",
  //           "group": "Perfume de mujer",
  //           "products": []
  //       }
  //   ]
  // }

  public constructor(private http: Http) {
    console.log('ASDJHADJHASJDHJS');
    console.log(this.apiUrl);
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
    //return this.products;
  }

  public getProduct(id: number) {
    // return this.http
    //   .get(`${this.apiUrl}products/${id}`)
    //   .map((response) => response.json());
  }

  // Handle Orders
  public placeOrder() {
    return;
  }
}
