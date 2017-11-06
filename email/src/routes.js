const Router = require('koa-router')
const { orderResponse } = require('./mail/actions')

const router = new Router()

router.post('/orderStatus', async ctx => {
  orderResponse(ctx.request.body)
  ctx.body = { message: 'Order status received' }
})

module.exports = router
