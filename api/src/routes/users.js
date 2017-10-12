const Router = require('koa-router')

const User = require('../models/user')

const router = new Router()

router.get('byEmail', '/:mail', async ctx => {
  const user = await User.findOne({ mail: ctx.params.mail })
  if (!user) {
    ctx.status = 404
    ctx.body = { userId: '' }
    return
  }
  ctx.body = { userId: user._id }
})

module.exports = router
