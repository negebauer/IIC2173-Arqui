const Router = require('koa-router')

const getArquitran = require('../helpers/getArquitran')
const parseCategories = require('../helpers/parseCategories')
const {
  setCache,
  getCategories,
  getNestedCategories,
} = require('../helpers/cache')

const router = new Router()

router.get('nestedCategories', '/products', async ctx => {
  const rawCategories = await getArquitran('/categories')
  const products = await getArquitran('/products')
  if (!rawCategories || !products) {
    const cacheCategories = await getNestedCategories()
    if (!cacheCategories || !cacheCategories.length) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.status = 200
    ctx.body = { source: 'cache', categories: cacheCategories }
    return
  }
  const categories = parseCategories(rawCategories, products)
  setCache(categories)
  ctx.status = 200

  ctx.body = { source: 'api', categories }
})

router.get('nestedCategory', '/:id/products', async ctx => {
  const rawCategories = await getArquitran('/categories')
  const products = await getArquitran('/products')
  if (!rawCategories || !products) {
    const cacheCategory = await getNestedCategories(ctx.params.id)
    if (!cacheCategory || !cacheCategory.length) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.status = 200
    ctx.body = { source: 'cache', category: cacheCategory[0] }
    return
  }
  const categories = parseCategories(rawCategories, products)
  setCache(categories)
  const category = categories.find(cat => cat.id == ctx.params.id)
  ctx.status = 200
  ctx.body = { source: 'api', category }
})

router.get('categories', '/', async ctx => {
  const categories = await getArquitran('/categories')
  if (!categories) {
    const cacheCategories = await getCategories()
    if (!cacheCategories || !cacheCategories.length) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.status = 200
    ctx.body = { source: 'cache', categories: cacheCategories }
    return
  }
  setCache(categories)
  ctx.status = 200
  ctx.body = { source: 'api', categories }
})

router.get('category', '/:id', async ctx => {
  const categories = await getArquitran('/categories')
  if (!categories) {
    const cacheCategory = await getCategories(ctx.params.id)
    if (!cacheCategory || !cacheCategory.length) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.status = 200
    ctx.body = { source: 'cache', categories: cacheCategory[0] }
    return
  }
  setCache(categories)
  const category = categories.find(cat => cat.id == ctx.params.id)
  ctx.status = 200
  ctx.body = { source: 'api', category }
})

module.exports = router
