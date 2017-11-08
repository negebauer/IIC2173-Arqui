# Arquiyalt Api

## Table Of Contents

- [Development](#development)
- [Environment variables](#environment-variables)
- [Api usage](#api-usage)
  - [Accounts](#accounts)
    - [Sign up](#sign-up)
    - [Login](#login)
  - [Products](#products)
    - [One product](#one-product)
    - [All products](#all-products)
  - [Categories](#categories)
    - [One category](#one-category)
    - [One category with nested products](#one-category-with-nested-products)
    - [All categories](#all-categories)
    - [All categories with nested products](#all-categories-with-nested-products)
  - [Orders](#orders)
    - [Make an order](#make-an-order)
    - [Validate an order](#validate-an-order)
  - [Contributors](#contributors)

## Development

Clone the repo and cd to `api` directory

```bash
yarn
yarn dev
```

## Environment variables

|variable|default|use|
|:-:|:-:|:-:|
|PORT|3000|port in which api will listen for requests|
|MONGO|mongodb://127.0.0.1:27017/IIC2173-Arqui|mongodb uri|
|MONGO_TEST|mongodb://127.0.0.1:27017/IIC2173-Arqui-test|mongodb uri for running tests|
|API_MAILER_SECRET|apimailersecret|certify that the mailer bot is the source of the request for security reasons|
|API_QUEUE_SECRET|apiqueuesecret|certify that the order queue is the source of the request for security reasons|
|MAILER_URI|http://localhost:3001|specifies Mailer's connection's host and port|
|QUEUE_URI|http://localhost:3002|specifies Queue's connection's host and port|
|API_URI|http://localhost:3000|specifies Api's connection's host and port|
|ARQUITRAN_URI|http://arqss17.ing.puc.cl:3000|specifies Arquitran API's connection's host and port|
|MAX_REQUEST_ATTEMPTS|2|defines how many times the API tries to receive an OK status from Arquitran API|
|MAX_REQUEST_TIMEOUT|200|defines how long the API waits to receive an OK status from Arquitran API since each request was made|
|SETTING_CACHE_TIMEOUT|30000|defines how long the API waits to set cache (products or categories) since its last update|

## Api usage

### Accounts

#### Sign up

- Route: `POST` `/signup`

- Headers:
  - Content-Type: `application/json`

- Example Body:

  ```javascript
  {
    "firstName": "Franco",
    "lastName": "Méndez",
    "mail": "fnmendez@uc.cl",
    "address": "Louis Pasteur 5418, Vitacura"
    "password": "123456"
  }
  ```

- Success Response:

  - Status: 201
  - Content:

    ```javascript
    { "token": "arquiyalt-token" }
    ```

- Error Response:

  - Code: 406
  - Content:

    ```javascript
    { "message": "error-message" }
    ```

***

#### Login

- Route: `POST` `/login`

- Headers:
  - Content-Type: `application/json`

- Example Body:

  ```javascript
  {
    "mail": "fnmendez@uc.cl",
    "password": "123456"
  }
  ```

- Success Response:

  - Status: 200
  - Content:

    ```javascript
    { "token": "arquiyalt-token" }
    ```

- Error Response:

  - Code: 403
  - Content:

    ```javascript
    { "message": "Invalid credentials." }
    ```

***

### Products

#### One product

- Route: `GET` `/products/:id`

- Headers:
  - Content-Type: `application/json`
  - Authorization: `type <value>` _(only required for some products)_

    &rarr; Examples
      - Authorization: `mail fnmendez@uc.cl`
      - Authorization: `token 19ab28cd37ef46`

- Success Response:

  - Status: 200
  - Example Content:

    ```javascript
    {
        "source": "cache",
        "updatedAt": "2017-10-12T17:12:45.359Z",
        "product": {
            "id": 10,
            "category": 10,
            "name": "Paracetamol"
        }
    }
    ```

- Error Response:

  &rarr; If the user isn't authenticated

  - Code: 403
  - Content:

    ```javascript
    { message: 'The information of this product is private.' }
    ```

  &rarr; Other error

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't resolve request to Arquitran API." }
    ```

***

#### All Products

- Route: `GET` `/products`

- Headers:
  - Content-Type: `application/json`
  - Authorization: `type <value>` _(optional)_

    &rarr; Examples
    - Authorization: `mail fnmendez@uc.cl`
    - Authorization: `token 19ab28cd37ef46`

- Success Response:

  - Status: 200
  - Example Content:

    ```javascript
    {
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
    ```

- Error Response:

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't resolve request to Arquitran API." }
    ```

***

### Categories

#### One category

- Route: `GET` `/categories/:id`

- Headers:
  - Content-Type: `application/json`
  - Authorization: `type <value>` _(only needed for some categories)_

    &rarr; Examples
    - Authorization: `mail fnmendez@uc.cl`
    - Authorization: `token 19ab28cd37ef46`

- Success Response:

  - Status: 200
  - Example Content:

    ```javascript
    {
        "source": "api",
        "category":
          {
              "id": 10,
              "context": "MEDICAMENTOS",
              "area": "ANALGESICO",
              "group": "Aminas"
          }
    }
    ```

- Error Response:

  &rarr; If the user isn't authenticated

  - Code: 403
  - Content:

    ```javascript
    { message: 'The information of this category is private.' }
    ```

  &rarr; Other error

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't resolve request to Arquitran API." }
    ```

***

#### All categories

- Route: `GET` `/categories`

- Headers:
  - Content-Type: `application/json`
  - Authorization: `type <value>` _(optional)_

    &rarr; Examples
    - Authorization: `mail fnmendez@uc.cl`
    - Authorization: `token 19ab28cd37ef46`

- Success Response:

  - Status: 200
  - Example Content:

    ```javascript
    {
        "source": "api",
        "categories": [
            {
                "id": 10,
                "context": "MEDICAMENTOS",
                "area": "ANALGESICO",
                "group": "Aminas"
            },
            {
                "id": 11,
                "context": "MEDICAMENTOS",
                "area": "ANALGESICO",
                "group": "AINES"
            },
            {
                "id": 15,
                "context": "MEDICAMENTOS",
                "area": "ANALGESICO",
                "group": "Cannabinoides"
            },
        ]
    }
    ```

- Error Response:

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't resolve request to Arquitran API." }
    ```

***

#### One category with nested products

- Route: `GET` `/categories/:id/products`

- Headers:
  - Content-Type: `application/json`
  - Authorization: `type <value>` _(only required for some categories)_

    &rarr; Examples
    - Authorization: `mail fnmendez@uc.cl`
    - Authorization: `token 19ab28cd37ef46`

- Success Response:

  - Status: 200
  - Example Content:

    ```javascript
    {
        "source": "cache",
        "updatedAt": "2017-10-12T00:25:28.373Z",
        "category": {
            "id": 11,
            "context": "MEDICAMENTOS",
            "area": "ANALGESICO",
            "group": "AINES",
            "products": [
                {
                    "name": "Ibuprofeno",
                    "category": 11,
                    "id": 30
                },
                {
                    "name": "Naproxen",
                    "category": 11,
                    "id": 40
                }
            ]
        }
    }
    ```

- Error Response:

  &rarr; If the user isn't authenticated

  - Code: 403
  - Content:

    ```javascript
    { message: 'The information of this category is private.' }
    ```

  &rarr; Other error

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't resolve request to Arquitran API." }
    ```


***

#### All categories with nested products

- Route: `GET` `/categories/products`

- Headers:
  - Content-Type: `application/json`
  - Authorization: `type <value>` _(optional)_

    &rarr; Examples
    - Authorization: `mail fnmendez@uc.cl`
    - Authorization: `token 19ab28cd37ef46`

- Success Response:

  - Status: 200
  - Example Content:

    ```javascript
    {
        "source": "api",
        "categories": [
            {
                "id": 111,
                "context": "BELLEZA",
                "area": "PRESENTACIÓN",
                "group": "Desodrante de hombre",
                "products": [
                    {
                        "id": 1042,
                        "category": 111,
                        "name": "OldSpice"
                    },
                    {
                        "id": 1045,
                        "category": 111,
                        "name": "AXE"
                    },
                    {
                        "id": 1072,
                        "category": 111,
                        "name": "Desodrante Nieve"
                    }
                ]
            },
            {
                "id": 112,
                "context": "BELLEZA",
                "area": "PRESENTACIÓN",
                "group": "Desodrante de mujer",
                "products": [
                    {
                        "id": 1067,
                        "category": 112,
                        "name": "Citric"
                    },
                    {
                        "id": 1073,
                        "category": 112,
                        "name": "Desodrante Nieve"
                    }
                ]
            },
            {
                "id": 114,
                "context": "BELLEZA",
                "area": "PRESENTACIÓN",
                "group": "Desodrante ambiental",
                "products": []
            },
            {
                "id": 141,
                "context": "BELLEZA",
                "area": "PRESENTACIÓN",
                "group": "Perfume de hombre",
                "products": []
            },
        ]
    }
    ```

- Error Response:

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't resolve request to Arquitran API." }
    ```

***

### Orders

#### Make an order

- Route: `POST` `/orders`

- Headers:
  - Content-Type: `application/json`
  - Authorization: `type <value>`
  - Secret: `<secret>` _(only through email)_
    - Example through web
      - Authorization: `token 19ab28cd37ef46`
    - Example through email
      - Authorization: `mail fnmendez@uc.cl`
      - Secret: `apimailersecret`

- Example Body:

  ```javascript
  {
    "productsIds": "[10, 105, 1042, 1045]"
  }
  ```

- Success Response:

  - Status: 200
  - Content:

    ```javascript
    { "message": "The order has been received." }
    ```

- Error Response:

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't resolve the request." }
    ```

***

#### Confirm an order

- Route: `GET` `/orders/:token`

- Headers:
  - Content-Type: `application/json`
  - Authorization: `type <value>`
  - Secret: `<secret>` _(only through email)_
    - Example through web
      - Authorization: `token 19ab28cd37ef46`
    - Example through email
      - Authorization: `mail fnmendez@uc.cl`
      - Secret: `apimailersecret`

- Success Response:

  - Status: 200
  - Content:

    ```javascript
    { "message": "The order confirmation was successful." }
    ```

- Error Response:

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't process the order confirmation." }
    ```

***

#### Validate an order

- Route: `POST` `/orders/resolved`

- Headers:
  - Content-Type: `application/json`
  - Secret: `<secret>`
    - Example
      - Secret: `apiqueuesecret`

- Example Body:

  ```javascript
  {
    "userId": "12abc345edf",
    "productId": "1042",
    "sentAt": "2017-10-16T22:13:31.343Z"
  }
  ```

- Success Response:

  - Status: 200
  - Content:

    ```javascript
    { "message": "The validation has been processed." }
    ```

- Error Response:

  - Code: 503
  - Content:

    ```javascript
    { "message": "Couldn't process the validation." }
    ```

***

## Contributors:

- [@fnmendez](https://github.com/fnmendez)
- [@negebauer](https://github.com/negebauer)
