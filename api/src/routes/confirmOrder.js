const Router = require('koa-router')

const Order = require('../models/order')
const { postQueue } = require('../helpers/localRequests')

const router = new Router()

router.get('confirmOrder', '/:token', async ctx => {
  const ordersAll = await Order.find({ token: ctx.params.token })
  const orders = ordersAll.filter(order => !order.confirmed)
  if (ordersAll.length === 0) {
    ctx.status = 404
    return (ctx.body = { message: 'Orden no encontrada' })
  } else if (orders.length === 0) {
    return (ctx.body = { message: 'Orden ya confirmada' })
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
    ctx.body = { message: 'No se pudo procesar la ordern' }
  } else {
    await Promise.all(orders.map(order => order.update({ confirmed: true })))
    ctx.body = { message: 'La orden fue confirmada exitosamente' }
  }
})

module.exports = router
