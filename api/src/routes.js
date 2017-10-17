const Router = require('koa-router')

const home = require('./routes/home')
const dummy = require('./routes/dummies')
const userAuthentication = require('./routes/userAuth')
const products = require('./routes/products')
const categories = require('./routes/categories')
const localAuthentication = require('./routes/localAuth')
const orders = require('./routes/orders')

const router = new Router()

// public routes
router.use('/', home.routes())
router.use('/dummies', dummy.routes())

// user authentication
router.use(userAuthentication)

// hibrid routes
router.use('/products', products.routes())
router.use('/categories', categories.routes())

// local authentication
router.use(localAuthentication)

// private routes
router.use('/orders', orders.routes())

module.exports = router
