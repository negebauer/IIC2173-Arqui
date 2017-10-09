const Router = require("koa-router")

const router = new Router()

router.get("products", "/", async ctx => {
  // const products = getProducts()
  ctx.body = { test: "Authenticated" }
  ctx.status = 200
})

router.get("product", "/:id", async ctx => {
  ctx.body = { test: "Authenticated" }
  ctx.status = 200
})

module.exports = router
