const getArquitran = require('./getArquitran')
const {
  setProductsCache,
  getProducts,
  getNestedCategories,
} = require('./cache')
const { parseCategories, parseContext } = require('./parseData')

const getRestrictionsInfo = async productsIds => {
  let products, productsContext, apiProducts
  const { cacheProducts } = await getProducts()
  if (!cacheProducts || !cacheProducts.length) {
    apiProducts = await getArquitran('/products')
    setProductsCache(apiProducts)
    products = apiProducts
      .filter(prod => productsIds.includes(prod.id))
      .reduce(
        (cp, prod) => [
          ...cp,
          { id: prod.id, name: prod.name, price: prod.price },
        ],
        []
      )
  } else {
    products = cacheProducts
      .filter(prod => productsIds.includes(prod.id))
      .reduce(
        (cp, prod) => [
          ...cp,
          { id: prod.id, name: prod.name, price: prod.price },
        ],
        []
      )
  }
  const { cacheCategories } = await getNestedCategories()
  if (!cacheCategories || !cacheCategories.length) {
    const apiCategories = await getArquitran('/categories')
    let categories
    if (cacheProducts.length) {
      categories = parseCategories(apiCategories, cacheProducts)
    } else {
      categories = parseCategories(apiCategories, apiProducts)
    }
    productsContext = parseContext(categories)
  } else {
    productsContext = parseContext(cacheCategories)
  }
  return { products, productsContext }
}

module.exports = getRestrictionsInfo
