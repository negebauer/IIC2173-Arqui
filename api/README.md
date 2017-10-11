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
  - [Categories](#Categories)
    - [One category](#one-category)
    - [One category with nested products](#one-category-with-nested-products)
    - [All categories](#all-categories)
    - [All categories with nested products](#all-categories-with-nested-products)


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

#### All Products

- Route: `GET` `/products`

- Headers:
  - Content-Type: `application/json`

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

---

#### One category

- Route: `GET` `/categories/:id`

- Headers:
  - Content-Type: `application/json`

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

---

### Categories

#### All categories

- Route: `GET` `/categories`

- Headers:
  - Content-Type: `application/json`

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

---

#### One category with nested products

- Route: `GET` `/categories/:id/products`

- Headers:
  - Content-Type: `application/json`

- Success Response:

  - Status: 200
  - Example Content:

    ```javascript
      {
        "source": "cache",
        "category":
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
        }
    }
    ```

---


#### All categories with nested products

- Route: `GET` `/categories/products`

- Headers:
  - Content-Type: `application/json`

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

---
