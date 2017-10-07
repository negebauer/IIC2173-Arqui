const Router = require("koa-router")

const index = require("./routes/index")

const router = new Router()

router.use("/", index.routes())

module.export = router
