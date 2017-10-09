const Router = require("koa-router")

const home = require("./routes/home")
const dummy = require("./routes/dummy")
const auth = require("./routes/auth")
const products = require("./routes/products")

const router = new Router()

// public routes
router.use("/", home.routes())
router.use("/dummy", dummy.routes())

// validate token
router.use(auth)

// private routes
router.use("/products", products.routes())

module.exports = router
