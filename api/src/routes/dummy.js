const Router = require("koa-router")
const os = require("os")
const Dummy = require("../models/dummy")
const pkg = require("../../package.json")

const router = new Router()

router.get("/", async ctx => {
  ctx.body = {
    hostname: os.hostname(),
    alive: true,
    v: pkg.version,
    time: new Date(),
  }
})

router.get("/dummies", async ctx => {
  const dummies = await Dummy.find().lean()
  ctx.body = { dummies }
})

router.post("/", async ctx => {
  const test = new Dummy({ date: new Date() })
  await test.save()
  ctx.status = 201
  ctx.body = test
})

module.exports = router
