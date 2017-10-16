# Orders Queue


## Table Of Contents

- [Development](#development)
- [Environment variables](#environment-variables)
- [Api usage](#api-usage)
  - [Purchase](#purchase)
- [Contributors](#contributors)


## Development
Clone repo and:

```bash
cd queue
yarn
yarn dev
```

## Environment variables

|variable|default|use|
|:-:|:-:|:-:|
|PORT|3002|port in which queue will listen for requests|
|API_URL|localhost:3000|api base url, should depend on the machine the queue is deployed|
|API_QUEUE_SECRET|apiqueuesecret|secret key shared between api and queue|
|KUE_PORT|3003|port for queue UI|
|REDIS_PORT|6379|redis database port|
|REDIS_HOST|localhost|redis database host|
|REDIS_PASS||redis database pass|

## API usage


### Purchase
- Route: `POST` `/purchase`

- Headers:
  - Content-Type: `application/json`
  - Secret: `env_variable_API_QUEUE_SECRET`

- Example Body:

  ```json
  {
    "user_id": "some_user_id",
    "products_array": ["some","product","ids"]
  }
  ```

- Success Response:

  - Status: 200
  - Content:

    ```json
    { "created": true }
    ```

- Error Response (untested):

  - Code: 500
  - Content:

    ```json
    { "created": false,"error":"some error" }
    ```

  - Code: 401
  - Content:

    ```json
    { "created": false, "error":"unauthorized" }
    ```

***

## Contributors:

* [@ironcadiz](https://github.com/ironcadiz)
* [@menavarrete](https://github.com/menavarrete)
