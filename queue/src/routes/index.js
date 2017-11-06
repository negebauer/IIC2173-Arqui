const Router = require('koa-router')
const os = require('os')

const router = new Router()

router.get('/', async ctx => {
  ctx.body = {
    hostname: os.hostname(),
    alive: true,
    time: new Date(),
  }
})

module.exports = router
