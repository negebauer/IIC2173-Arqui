const Router = require("koa-router")
const pkg = require("../../package.json")

const router = new Router()

router.get("/", ctx => (ctx.body = { alive: true, v: pkg.version, time: new Date() }))

module.exports = router
