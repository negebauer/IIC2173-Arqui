# Arquiyalt-API

## Table Of Contents

- [Usage](#usage)

  - [Accounts](#accounts)
    - [Sign up](#sign-up)
    - [Login](#login)

  - [Products](#products)
    - [List products](#list-products)
    - [Show product](#show-product)

## Usage

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
