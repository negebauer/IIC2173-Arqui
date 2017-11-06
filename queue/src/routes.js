const Router = require('koa-router')

const auth = require('./routes/auth')
const index = require('./routes/index')
const purchases = require('./routes/purchases')

const router = new Router()

router.use(auth)
router.use('/', index.routes())
router.use('/purchase', purchases.routes())

module.exports = router
