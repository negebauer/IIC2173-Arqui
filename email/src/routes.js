const Router = require('koa-router')

const orderStatus = require('./routes/orderStatus')

const router = new Router()

router.use('/orderStatus', orderStatus.routes())

module.exports = router
