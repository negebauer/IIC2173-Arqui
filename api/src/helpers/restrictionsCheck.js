const Order = require('../models/order')
const getRestrictionsInfo = require('./restrictionsInfo')
const { parseOrders } = require('./parseData')
const tests = require('../restrictions')

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
  const feedback = tests.reduce(
    (cf, test) => ({
      ...cf,
      [test.name]: products.reduce(
        (cts, prod) => [
          ...cts,
          { id: prod.id, name: prod.name, passed: test(info, prod.id) },
        ],
        []
      ),
    }),
    {}
  )
  const success = Object.keys(feedback)
    .reduce(
      (crs, test) => [...crs, ...feedback[test].map(results => results.passed)],
      []
    )
    .every(fact => fact)
  return { feedback, success }
}

module.exports = check
