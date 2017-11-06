/* eslint-disable no-console */

const Router = require('koa-router')
const { createPurchase } = require('../queueTasks/purchase')

const router = new Router()

router.post('/', async ctx => {
  const { orders } = ctx.request.body
  try {
    const tasks = await Promise.all(
      orders.map(order => {
        const { userId, productId, sentAt } = order
        return createPurchase(ctx.queue, userId, productId, sentAt)
      })
    )
    ctx.body = { message: `Created ${tasks.length} tasks` }
  } catch (err) {
    ctx.body = err
  }
})

module.exports = router
