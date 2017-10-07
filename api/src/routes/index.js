const Router = require("koa-router")
const Test = require('../models/test')
const pkg = require("../../package.json")

const router = new Router()

router.get("/", async ctx => {
  const tests = await Test.find().lean()
  ctx.body = { alive: true, v: pkg.version, time: new Date(), tests }
})

router.post("/", async ctx => {
  const test = new Test({date: new Date()})
  await test.save()
  ctx.status = 201
  ctx.body = test
})

module.exports = router
