# Arquiyalt queue

## Table Of Contents

- [Development](#development)
- [Environment variables](#environment-variables)
- [Api usage](#api-usage)
  - [Purchase](#purchase)
- [Contributors](#contributors)

## Development

Clone the repo and cd to `queue` directory

```bash
yarn
yarn dev
```

## Environment variables

|variable|default|use|
|:-:|:-:|:-:|
|PORT|3002|port in which queue will listen for requests|
|API_URI|localhost:3000|api base url, should depend on the machine the queue is deployed|
|API_QUEUE_SECRET|apiqueuesecret|secret key shared between api and queue|
|REDIS_PORT|6379|redis database port|
|REDIS_HOST|localhost|redis database host|
|REDIS_PASS||redis database pass|
|ARQUITRAN_URI|http://arqss16.ing.puc.cl|arquitran api url|
|ARQUITRAN_TOKEN|d51f6a66-e670-41c4-8187-2149bc46654e|arquitran api token|
|ARQUITRAN_ID|G1|arquitan api group id|

## API usage

### Purchase
- Route: `POST` `/purchase`
- Headers:
  - Content-Type: `application/json`
  - Secret: `env_variable_API_QUEUE_SECRET`
- Example Body:

  ```json
  {
    "orders": [
      {
        "userId": "aUserId",
        "productId": "aProductId",
        "sentAt": "dateOfPurchase"
      },
    ]
  }
  ```

- Success Response:
  - Status: 200
  - Content:

    ```json
    { "message": "Created N tasks" }
    ```

- Error Response (untested):
  - Code: 500
  - Content:

    ```json
    { "message": "Error description" }
    ```

  - Code: 401
  - Content:

    ```json
    { "message": "Unauthorized" }
    ```

***

## Contributors:

- [@ironcadiz](https://github.com/ironcadiz)
- [@menavarrete](https://github.com/menavarrete)
- [@negebauer](https://github.com/negebauer)
- [@fnmendez](https://github.com/fnmendez)
