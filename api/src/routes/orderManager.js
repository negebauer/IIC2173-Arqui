const check = require('../helpers/restrictionsCheck')
const Order = require('../models/order')
const { parseProducts } = require('../helpers/parseData')
const { postMailer } = require('../helpers/localRequests')
const { API_URI } = require('../constants')
const uuid = require('uuid/v4')

module.exports = async ctx => {
  const userId = ctx.state.user._id
  const productsIds = ctx.request.body.productsIds
  const { feedback, error } = await check(userId, productsIds)
  const source = ctx.state.source
  const token = uuid()
  if (error) {
    ctx.body = { message: 'Your order failed.' }
    ctx.status = 422
    console.log(feedback) // eslint-disable-line no-console
  } else {
    const parsedProducts = parseProducts(feedback.products)
    parsedProducts.forEach(async ({ productId, productName }) => {
      const order = new Order({ userId, productId, productName, token, source })
      await order.save()
    })
    // if (ctx.state.source === 'mail') {
    await postMailer('/orderStatus', {
      user: ctx.state.user.mail,
      confirmationUrl: `${API_URI}/confirmOrder/${token}`,
      ...feedback,
    })
    // }
    ctx.body = { message: 'Your order has been received.' }
  }
}
