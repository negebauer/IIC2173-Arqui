const Order = require('../models/order')
const getRestrictionsInfo = require('./restrictionsInfo')
const { parseOrders } = require('./parseData')
const tests = require('../restrictions')

const isValidProduct = (product, info) => {
  const notPassedTests = tests.filter(test => !test(info, product.id))

  return notPassedTests.length === 0
}

const check = async (userId, productsIds) => {
  const { products, productsContext } = await getRestrictionsInfo(productsIds)
  if (!products || !productsContext || !products.length) {
    const feedback = new Error()
    feedback.message = "Couldn't resolve the request."
    return { feedback }
  }
  const userOrders = await Order.find({ userId })
  const parsedOrders = parseOrders(userOrders)
  const info = { productsContext, parsedOrders }
  const validProducts = products.filter(product =>
    isValidProduct(product, info)
  )
  const errors = tests.reduce(
    (cf, test) => ({
      ...cf,

      [test.name]: products.filter(prod => !test(info, prod.id)),
    }),
    {}
  )
  const feedback = {
    products: validProducts,
    errors: errors,
  }
  return feedback
}

module.exports = check
