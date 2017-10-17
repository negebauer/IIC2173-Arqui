const check = require('../helpers/restrictionsCheck')
const Order = require('../models/order')
const { parseFeedback } = require('../helpers/parseData')
const { postMailer, postQueue } = require('../helpers/localRequests')

module.exports = async ctx => {
  const userId = ctx.state.user._id
  const productsIds = ctx.request.body.productsIds
  const { feedback, success } = await check(userId, productsIds)
  if (success) {
    const orders = []
    const productsInfo = parseFeedback(feedback)
    productsInfo.forEach(async ({ productId, productName }) => {
      const order = new Order({ userId, productId, productName })
      orders.push({ userId, productId, sentAt: order.sentAt })
      order.save()
    })
    const status = await postQueue('/purchase', { orders })
    if (status !== 200) {
      console.log("Couldn't submit the order to queue.") // eslint-disable-line no-console
    }
  } else if (feedback.constructor.name === 'Error') {
    console.log(feedback) // eslint-disable-line no-console
  } else {
    await postMailer('/orderStatus', {
      user: ctx.state.user.mail,
      errors: feedback,
    })
  }
}
