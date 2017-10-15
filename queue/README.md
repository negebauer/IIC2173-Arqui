# Orders Queue


## Table Of Contents

- [Development](#development)
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

## API usage


### Purchase
- Route: `POST` `/purchase`

- Headers:
  - Content-Type: `application/json`

- Example Body:

  ```json
  {
    "user_id": 2,
    "products_array": [1,24,30],
    "amounts_array": [1,1,2]
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
    { "created": false }
    ```

***

## Contributors:

* [@ironcadiz](https://github.com/ironcadiz)
* [@menavarrete](https://github.com/menavarrete)
