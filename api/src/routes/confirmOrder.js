const Router = require('koa-router')

const Order = require('../models/order')
const { postQueue } = require('../helpers/localRequests')

const router = new Router()

router.get('confirmOrder', '/:token', async ctx => {
  const orders = await Order.find({ token: ctx.params.token })
  if (orders.length === 0) {
    ctx.status = 404
    return (ctx.body = { message: 'Orders not found' })
  }
  const status = await postQueue('/purchase', {
    orders: orders.map(order => ({
      userId: order.userId,
      productId: order.productId,
      sentAt: order.sentAt,
    })),
  })
  if (status !== 200) {
    ctx.status = 503
    ctx.body = { message: "Couldn't process the order confirmation." }
  } else {
    await Promise.all(
      orders.map(order => order.update({ confirmed: true, token: '' }))
    )
    ctx.body = { message: 'The order confirmation was successful.' }
  }
})

module.exports = router
