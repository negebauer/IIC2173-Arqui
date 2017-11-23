const Router = require('koa-router')

const getArquitran = require('../helpers/getArquitran')
const { parseCategories } = require('../helpers/parseData')
const {
  setCategoriesCache,
  getCategories,
  getNestedCategories,
} = require('../helpers/cache')

const router = new Router()

router.get('nestedCategories', '/products', async ctx => {
  if (ctx.state.user) {
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
  } else {
    const rawCategories = await getArquitran('/categories')
    const products = await getArquitran('/products')
    if (!rawCategories || !products) {
      const { cacheCategories, updatedAt } = await getNestedCategories()
      if (!cacheCategories || !cacheCategories.length) {
        ctx.status = 503
        ctx.body = { message: "Couldn't resolve request to Arquitran API." }
        return
      }
      const filteredCategories = cacheCategories.filter(
        cat => cat.context !== 'MEDICAMENTOS'
      )
      ctx.body = { source: 'cache', updatedAt, categories: filteredCategories }
      return
    }
    const categories = parseCategories(rawCategories, products)
    setCategoriesCache(categories)
    const filteredCategories = categories.filter(
      cat => cat.context !== 'MEDICAMENTOS'
    )
    ctx.body = { source: 'api', categories: filteredCategories }
  }
})

router.get('nestedCategory', '/:id/products', async ctx => {
  if (ctx.state.user) {
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
    const category = categories.find(
      cat => cat.id === (Number(ctx.params.id) || -1)
    )
    if (!category) {
      ctx.status = 404
      ctx.body = { message: "Didn't found the category." }
      return
    }
    ctx.body = { source: 'api', category }
  } else {
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
      if (cacheCategory.context === 'MEDICAMENTOS') {
        ctx.status = 403
        ctx.body = { message: 'The information of this category is private.' }
        return
      }
      ctx.body = { source: 'cache', updatedAt, category: cacheCategory }
      return
    }
    const categories = parseCategories(rawCategories, products)
    setCategoriesCache(categories)
    const category = categories.find(
      cat => cat.id === (Number(ctx.params.id) || -1)
    )
    if (!category) {
      ctx.status = 404
      ctx.body = { message: "Didn't found the category." }
      return
    }
    if (category.context === 'MEDICAMENTOS') {
      ctx.status = 403
      ctx.body = { message: 'The information of this category is private.' }
      return
    }
    ctx.body = { source: 'api', category }
  }
})

router.get('categories', '/', async ctx => {
  if (ctx.state.user) {
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
  } else {
    const categories = await getArquitran('/categories')
    if (!categories) {
      const { cacheCategories, updatedAt } = await getCategories()
      if (!cacheCategories || !cacheCategories.length) {
        ctx.status = 503
        ctx.body = { message: "Couldn't resolve request to Arquitran API." }
        return
      }
      const filteredCategories = cacheCategories.filter(
        cat => cat.context !== 'MEDICAMENTOS'
      )
      ctx.body = { source: 'cache', updatedAt, categories: filteredCategories }
      return
    }
    setCategoriesCache(categories)
    const filteredCategories = categories.filter(
      cat => cat.context !== 'MEDICAMENTOS'
    )
    ctx.body = { source: 'api', categories: filteredCategories }
  }
})

router.get('category', '/:id', async ctx => {
  if (ctx.state.user) {
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
    const category = categories.find(
      cat => cat.id === (Number(ctx.params.id) || -1)
    )
    if (!category) {
      ctx.status = 404
      ctx.body = { message: "Didn't found the category." }
      return
    }
    ctx.body = { source: 'api', category }
  } else {
    const categories = await getArquitran('/categories')
    if (!categories) {
      const { cacheCategory, updatedAt } = await getCategories(ctx.params.id)
      if (!cacheCategory) {
        ctx.status = 503
        ctx.body = { message: "Couldn't resolve request to Arquitran API." }
        return
      }
      if (cacheCategory.context === 'MEDICAMENTOS') {
        ctx.status = 403
        ctx.body = { message: 'The information of this category is private.' }
        return
      }
      ctx.body = { source: 'cache', updatedAt, category: cacheCategory }
      return
    }
    setCategoriesCache(categories)
    const category = categories.find(
      cat => cat.id === (Number(ctx.params.id) || -1)
    )
    if (!category) {
      ctx.status = 404
      ctx.body = { message: "Didn't found the category." }
      return
    }
    if (category.context === 'MEDICAMENTOS') {
      ctx.status = 403
      ctx.body = { message: 'The information of this category is private.' }
      return
    }
    ctx.body = { source: 'api', category }
  }
})

module.exports = router
