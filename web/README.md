# Arquiyalt Web

## Table Of Contents

- [Development](#development)
- [Environment variables](#environment-variables)
- [Todo](#Todo)

## Development

Clone the repo and cd to `web` directory

```bash
yarn
yarn start
```

Now open http://localhost:4200 in your browser

## Environment variables

|variable|default|use|
|:-:|:-:|:-:|
|PORT|4200|port in which api will listen for requests|
|API|localhost:3000|api url|

## Todo

- Check if user is logged in before pressing purchase button
- Serious css changes on products.component
- Add purchase method to HttpServiceProvider (when endpoint is ready)
- Complete purchase method on cart.component (right now it shows an alert [not implemented])
- Make website responsive for mobile phones
