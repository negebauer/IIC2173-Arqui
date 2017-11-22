const Router = require('koa-router')

const User = require('../models/user')
const Order = require('../models/order')
const orderManager = require('./orderManager')
const { postMailer } = require('../helpers/localRequests')

const router = new Router()

router.post('orders', '/', async ctx => {
  return orderManager(ctx)
})

router.post('orders', '/resolved', async ctx => {
  const userId = ctx.request.body.userId
  const productId = ctx.request.body.productId
  const sentAt = ctx.request.body.sentAt
  const order = await Order.findOne({ userId, productId, sentAt })
  await order.update({ completed: true })
  const user = await User.findOne({ _id: userId }, { mail: true })
  const status = await postMailer('/orderStatus', {
    user: user.mail,
    resolved: { productId: order.productId, productName: order.productName },
  })
  if (status === 200) {
    ctx.body = { message: 'The validation has been processed.' }
  } else {
    ctx.status = 503
    ctx.body = { message: "Couldn't process the validation." }
  }
})

router.get('orders', '/', async ctx => {
  if (
    !ctx.query.sort ||
    (ctx.query.sort !== 'asc' && ctx.query.sort !== 'desc')
  )
    ctx.query.sort = 'desc'
  const orders = await Order.find(
    { userId: ctx.state.user._id },
    {
      _id: false,
      productId: true,
      productName: true,
      completed: true,
      sentAt: true,
    },
    {
      sort: { sentAt: ctx.query.sort },
    }
  )
  ctx.body = { orders }
})

module.exports = router
