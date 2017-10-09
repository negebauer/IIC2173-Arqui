# Arquiyalt Api

## Table Of Contents

- [Development](#development)
- [Environment variables](#environment-variables)
- [Api usage](#api-usage)
  - [Accounts](#accounts)
    - [Sign up](#sign-up)
    - [Login](#login)
  - [Products](#products)
    - [List products](#list-products)
    - [Show product](#show-product)

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

---

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

---

### Products

#### List Products

- Route: `GET` `/products`

- Headers:
  - Authorization: `arquiyalt-token`
  - Content-Type: `application/json`

- Success Response:

  - Status: 200

---

#### Show Product

- Route: `GET` `/products/:id`

- Headers:
  - Authorization: `arquiyalt-token`
  - Content-Type: `application/json`

- Success Response:

  - Status: 200

---
