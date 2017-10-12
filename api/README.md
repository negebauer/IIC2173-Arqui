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
  - [Users](#users)
    - [Id through email](#id-through-email)


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

### Users

#### Id through email

- Route: `GET` `/users/:email`
  - Example route: `GET /users/example@uc.cl`

- Headers:
  - Content-Type: `application/json`

- Success Response:

  - Status: 200
  - Example Content:

    ```javascript
    {
        "userId": "59deb0dfcb264bbed27a4e3d"
    }
    ```

- Error Response:

  - Code: 404
  - Content:

    ```javascript
    { "message": "Couldn't find a user." }
    ```
