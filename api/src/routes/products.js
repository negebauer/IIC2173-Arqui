const Router = require('koa-router')

const getArquitran = require('../helpers/getArquitran')
const {
  setProductsCache,
  setCategoriesCache,
  getProducts,
  getNestedCategories,
} = require('../helpers/cache')
const { parseCategories } = require('../helpers/parseData')

const Product = require('../models/product')

const router = new Router()

router.get('products', '/', async ctx => {
  const page = ctx.query.page || null
  if (ctx.state.user) {
    let products
    if (!page) {
      products = await getArquitran(`/products`)
    } else {
      products = await getArquitran(`/products?page=${page}`)
    }
    let cacheProducts, updatedAt
    if (!products) {
      if (!page) {
        const aux = await getProducts()
        cacheProducts = aux.cacheProducts
        updatedAt = aux.updatedAt
      } else {
        const aux = await getProducts(null, page)
        cacheProducts = aux.cacheProducts
        updatedAt = aux.updatedAt
      }

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

router.get('products', '/search', async ctx => {
  if (ctx.state.user) {
    const numResults = parseInt(ctx.query.n, 10)
    const page = parseInt(ctx.query.page, 10)
    try {
      const query = ctx.query.query.slice(1, -1)
      const totalProducts = await Product.count({
        name: {
          $regex: query,
          $options: 'gi',
        },
      })
      const products = await Product.find({
        name: {
          $regex: query,
          $options: 'gi',
        },
      })
        .select({ id: 1, name: 1, _id: 0, category: 1, price: 1 })
        .skip(numResults * (page - 1))
        .limit(numResults)
      if (products.length === 0) {
        ctx.status = 402
        ctx.body = { message: 'Query has no results.' }
      } else {
        ctx.body = {
          products: products,
          totalPages: Math.ceil(totalProducts / numResults),
        }
      }
    } catch (err) {
      ctx.status = 503
      ctx.body = { message: 'Query failed to execute.' }
    }
  } else {
    ctx.status = 403
    ctx.body = { message: 'User must be logged in to search.' }
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
    const product = products.find(
      prod => prod.id === (Number(ctx.params.id) || -1)
    )
    if (!product) {
      ctx.status = 404
      ctx.body = { message: "Didn't found the product." }
      return
    }
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
        if (prod.id === (Number(ctx.params.id) || -1)) {
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
