const Router = require('koa-router')

const getArquitran = require('../helpers/getArquitran')
const parseCategories = require('../helpers/parseCategories')
const {
  setCategoriesCache,
  getCategories,
  getNestedCategories,
} = require('../helpers/cache')

const router = new Router()

router.get('nestedCategories', '/products', async ctx => {
  const rawCategories = await getArquitran('/categories')
  const products = await getArquitran('/products')
  if (!rawCategories || !products) {
    const { cacheCategories, updatedAt } = await getNestedCategories()
    if (!cacheCategories || !cacheCategories.length) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.body = { source: 'cache', updatedAt, categories: cacheCategories }
    return
  }
  const categories = parseCategories(rawCategories, products)
  setCategoriesCache(categories)
  ctx.body = { source: 'api', categories }
})

router.get('nestedCategory', '/:id/products', async ctx => {
  const rawCategories = await getArquitran('/categories')
  const products = await getArquitran('/products')
  if (!rawCategories || !products) {
    const { cacheCategory, updatedAt } = await getNestedCategories(
      ctx.params.id
    )
    if (!cacheCategory) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.body = { source: 'cache', updatedAt, category: cacheCategory }
    return
  }
  const categories = parseCategories(rawCategories, products)
  setCategoriesCache(categories)
  const category = categories.find(cat => cat.id === ctx.params.id)
  ctx.body = { source: 'api', category }
})

router.get('categories', '/', async ctx => {
  const categories = await getArquitran('/categories')
  if (!categories) {
    const { cacheCategories, updatedAt } = await getCategories()
    if (!cacheCategories || !cacheCategories.length) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.body = { source: 'cache', updatedAt, categories: cacheCategories }
    return
  }
  setCategoriesCache(categories)
  ctx.body = { source: 'api', categories }
})

router.get('category', '/:id', async ctx => {
  const categories = await getArquitran('/categories')
  if (!categories) {
    const { cacheCategory, updatedAt } = await getCategories(ctx.params.id)
    if (!cacheCategory) {
      ctx.status = 503
      ctx.body = { message: "Couldn't resolve request to Arquitran API." }
      return
    }
    ctx.body = { source: 'cache', updatedAt, category: cacheCategory }
    return
  }
  setCategoriesCache(categories)
  const category = categories.find(cat => cat.id === ctx.params.id)
  ctx.body = { source: 'api', category }
})

module.exports = router
