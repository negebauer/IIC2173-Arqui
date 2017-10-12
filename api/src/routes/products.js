const Router = require('koa-router')

const getArquitran = require('../helpers/getArquitran')
const { getProducts } = require('../helpers/cache')

const router = new Router()

router.get('products', '/', async ctx => {
  const rawProducts = await getArquitran('/products')
  if (!rawProducts) {
    const cacheProducts = await getProducts()
    if (!cacheProducts) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.body = { source: 'cache', products: cacheProducts }
    return
  }
  ctx.body = { source: 'api', products: rawProducts }
})

module.exports = router
