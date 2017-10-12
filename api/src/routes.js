const Router = require("koa-router")

const home = require("./routes/home")
const dummy = require("./routes/dummy")
const authenticate = require("./routes/auth")
const products = require("./routes/products")
const categories = require("./routes/categories")
const users = require("./routes/users")

const router = new Router()

// public routes
router.use("/", home.routes())
router.use("/dummy", dummy.routes())
router.use("/products", products.routes())
router.use("/categories", categories.routes())
router.use("/users", users.routes())

// validate token
router.use(authenticate)

// private routes

module.exports = router
