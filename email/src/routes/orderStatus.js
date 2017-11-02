const Router = require('koa-router')
const actions = require('../mail/actions')

const router = new Router()

router.post('/', async ctx => {
  actions.orderResponse(ctx)
  ctx.body = { message: 'received' }
})

module.exports = router
