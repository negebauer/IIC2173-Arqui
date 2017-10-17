const Router = require('koa-router')

const getArquitran = require('../helpers/getArquitran')
const { setProductsCache, getProducts } = require('../helpers/cache')

const router = new Router()

router.get('products', '/', async ctx => {
  const products = await getArquitran('/products')
  if (!products) {
    const { cacheProducts, updatedAt } = await getProducts()
    if (!cacheProducts || !cacheProducts.length) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.body = { source: 'cache', updatedAt, products: cacheProducts }
    return
  }
  setProductsCache(products)
  ctx.body = { source: 'api', products }
})

router.get('product', '/:id', async ctx => {
  const products = await getArquitran('/products')
  if (!products) {
    const { cacheProduct, updatedAt } = await getProducts(ctx.params.id)
    if (!cacheProduct) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.body = { source: 'cache', updatedAt, product: cacheProduct }
    return
  }
  setProductsCache(products)
  const product = products.find(prod => prod.id === ctx.params.id)
  ctx.body = { source: 'api', product }
})

module.exports = router
