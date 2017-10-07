const Router = require("koa-router")
const pkg = require("../../package.json")

const router = new Router()

router.get("/", ctx => (ctx.body = { v: pkg.version }))

module.export = router
