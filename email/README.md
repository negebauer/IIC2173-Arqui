# Arquiyalt Email

## Table Of Contents

- [Development](#development)
- [Environment variables](#environment-variables)
- [Emails specification](#emails-specification)
  - [Email address](#email-address)
  - [Helper format](#helper-format)
  - [Buy format](#buy-format)
  - [Query formats](#email-formats)
    - [One or more products](#one-or-more-products)
    - [All products](#all-products)
    - [All products from one or more categories](#All-products-from-one-or-more-categories)
    - [All products from all categories](#All-products-from-all-categories)
    - [One category](#one-category)
    - [All categories](#all-categories)
- [Api usage](#api-usage)
  - [Order status](#order-status)
- [Contributors](#contributors)

## Development

Clone the repo and cd to `email` directory

```bash
yarn
yarn dev
```

## Environment variables

|variable|default|use|
|:-:|:-:|:-:|
|API_URI|localhost:3000|api url|
|PORT|3001|port in which email client will listen for requests|
|MAIL_NAME|Grupo1-Dev|name that appears when email is received|
|MAIL_USER|iic2173grupo1dev@gmail.com|mail account username|
|MAIL_PASSWORD|arqui123|mail account password|
|API_MAILER_SECRET|apimailersecret|secret token to authenticate with api|

## Emails specification

### Email address

The email address clients must contact is IIC2173grupo1@gmail.com

***

### Helper format

- Subject: "Ayuda" (or any invalid header)
- Body: ""

This will send and email with all the possible Email formats you can send.

***

### Buy format

- Subject: "Compra"
- Body: "productId1;productId2;productId3;productId4"

This will result in buying the products with id productId1, productId2, productId3 and productId4
<!---
- Reponse:
-->
<EJEMPLO DE RESPUESTA DEL MAIL>

***

### Query formats

#### One or more products

- Subject: "Productos"
- Body: "productId1;productId2;productId3;productId4"

Retrieve the information of the products with id productId1, productId2, productId3 and productId4.

***

#### All products

- Subject: "Catalogo"
- Body: ""

Retrieve the information of all products.

***

#### All products from one or more categories

- Subject: "Productos por categoria"
- Body: "idCategoria1;idCategoria2"

Retrieve the information of the categories with id is idCategoria1 and idCategoria2, with the information of the products that belong to that category.

***

#### All products from all categories

- Subject: "Catalogo por categoria"
- Body: ""

Retrieve the information of all categories, with the information of the products that belong to the categories.

***

#### One category

- Subject: "Categoria"
- Body: "idCategoria"

Retrieve the information of the category with id is idCategoria.

***

#### All categories

- Subject: "Categorias"
- Body: ""

Retrieve the information of all existing categories in the store.

***

## Api usage

### Order status

This endpoint receive the status of a pre-made purchase to inform the client of the status of that request.

- Route: `POST` `/orderStatus/`

- Headers:
  - Content-Type: `application/json`
  - Secret: <secret>
    - Example through email
      - Secret: `apimailersecret`

- Example Body:

  ```javascript
  {
    "user": "persona@uc.cl",
    "products":
    [
      { id: 104, name: 'Factor 50', price: 2300, passed: true },
      { id: 1045, name: 'AXE', price: 1700, passed: true }
    ]
    "errors":
    {
      notMedicine:
      [
        { id: 10, name: 'Paracetamol', price: 700, passed: false }
      ],
      notBeenBoughtToday:
      [
        { id: 1042, name: 'OldSpice', price: 1700, passed: false },
        { id: 105, name: 'Factor 30', price: 1700, passed: false }
      ]
    }
    "confirmationUrl": "<filtered order confirmation url>"
  }
  ```
  or

  ```javascript
  {
  "user": 'persona@uc.cl',
  "resolved":
    {
      "productId": 1042,
      "productName": 'OldSpice'
    }
  }
  ```

- Success Response:

  - Status: 200
  - Content:

    ```javascript
    { "message": "Order status received." }
    ```

***

## Contributors

- [@dagalemiri](https://github.com/dagalemiri)
- [@josehj](https://github.com/josehj)
- [@fnmendez](https://github.com/fnmendez)
- [@negebauer](https://github.com/negebauer)
