# Arquiyalt Email

## Table Of Contents

- [Development](#development)
- [Environment variables](#environment-variables)
- [Email address](#email-address)
- [Email formats](#email-formats)
  - [View all products](#view-all-products)
  - [View all categories](#view-all-categories)
  - [View one category](#view-one-category)
  - [View all products of one or more categories](#view-all-products-of-one-or-more-categories)
  - [View all products of all categories](#view-all-products-of-all-categories)
  - [View one or more products](#view-one-or-more-products)
  - [Buy products](#buy-products)
  - [Help](#help)
- [Api usage](#api-usage))
  - [orderStatus](#orderStatus)

## Development

Clone the repo and cd to `api` directory

```bash
yarn
yarn dev
```

## Environment variables

|variable|default|use|
|:-:|:-:|:-:|
|PORT|3001|port in which email client will listen for requests|
|API|localhost:3000|api url|
|API_MAILER_SECRET|apimailersecret|secret token to auth with api|
|MAIL_PASSWORD|arquitectura|mail account password|

## Email address

The email address to which clientes must contact is IIC2173grupo1@gmail.com

## Email formats

The following are the accepted mails formats for the client querys

### View all products

- Header: "Catalogo"
- Body: ""

This will result in retrieving the information of all products available in the store.

### View all categories

- Header: "Categorias"
- Body: ""

This will result in retrieving the information of all existing categories in the store.

### View one category

- Header: "Categoria"
- Body: "Categoria: idCategoria."

This will result in retrieving the information of the category with id is idCategoria.

### View all products of one or more categories

- Header: "Productos por categoria"
- Body: "Categoria: idCategoria1;idCategoria2."

This will result in retrieving the information of the categories with id is idCategoria1 and idCategoria2, with the information of the products that belong to that category.

### View all products of all categories

- Header: "Catalogo por categoria"
- Body: ""

This will result in retrieving the information of all categories, with the information of the products that belong to the categories.

### View one or more products

- Header: "Consulta"
- Body: "Producto: productId1;productId1;productId1;productId1."

This will result in retrieving the information of the products with id productId1, productId2, productId3 and productId4.
<!---
- Reponse:
-->

<EJEMPLO DE RESPUESTA DEL MAIL>

### Buy products

- Header: "Compra"
- Body: "Producto: productId1;productId1;productId1;productId1."

This will result in buying the products with id productId1, productId2, productId3 and productId4
<!---
- Reponse:
-->
<EJEMPLO DE RESPUESTA DEL MAIL>

### Help

- Header: "Ayuda" (or any invalid header)
- Body: ""

This will send and email with all the posible Email formats you can send.

## Api usage

### orderStatus

This api receive the status of a pre-made purchase to inform the client of the status of that request.

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
    "errors":
    {
      "notMedicine":
        [
          {
            "id": 20,
            "name": "Dimetilamina"
          },
          {
            "id": 30,
            "name": "Ibuprofeno"
          }
        ],
      "notBeenBoughtToday":
        [
          {
            "id": 1072,
            "name": "Desodorante Nieve"
          }
        ]
    }
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
