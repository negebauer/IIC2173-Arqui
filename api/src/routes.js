const Router = require("koa-router")

const dummy = require("./routes/dummy")

const router = new Router()

router.use("/dummy", dummy.routes())

module.exports = router
