const Router = require('koa-router')

const getArquitran = require('../helpers/getArquitran')
const {
  setProductsCache,
  setCategoriesCache,
  getProducts,
  getNestedCategories,
} = require('../helpers/cache')
const { parseCategories } = require('../helpers/parseData')

const router = new Router()

router.get('products', '/', async ctx => {
  if (ctx.state.user) {
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
      const filteredProducts = cacheCategories
        .filter(cat => cat.context !== 'MEDICAMENTOS')
        .reduce((cc, cat) => [...cc, ...cat.products], [])
      ctx.body = { source: 'cache', updatedAt, products: filteredProducts }
      return
    }
    const categories = parseCategories(rawCategories, products)
    setCategoriesCache(categories)
    const filteredProducts = categories
      .filter(cat => cat.context !== 'MEDICAMENTOS')
      .reduce((cc, cat) => [...cc, ...cat.products], [])
    ctx.body = { source: 'api', products: filteredProducts }
  }
})

router.get('product', '/:id', async ctx => {
  if (ctx.state.user) {
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
      let filteredProduct
      cacheCategories.forEach(cat => {
        if (cat.context === 'MEDICAMENTOS') {
          return
        }
        cat.products.forEach(prod => {
          if (prod.id === ctx.params.id) {
            filteredProduct = prod
          }
        })
      })
      if (!filteredProduct) {
        ctx.status = 403
        ctx.body = { message: 'The information of this product is private.' }
        return
      }
      ctx.body = { source: 'cache', updatedAt, product: filteredProduct }
      return
    }
    const categories = parseCategories(rawCategories, products)
    setCategoriesCache(categories)
    let filteredProduct
    categories.forEach(cat => {
      if (cat.context === 'MEDICAMENTOS') {
        return
      }
      cat.products.forEach(prod => {
        if (prod.id === ctx.params.id) {
          filteredProduct = prod
        }
      })
    })
    if (!filteredProduct) {
      ctx.status = 403
      ctx.body = { message: 'The information of this product is private.' }
      return
    }
    ctx.body = { source: 'api', product: filteredProduct }
  }
})

module.exports = router
